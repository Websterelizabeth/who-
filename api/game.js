// api/game.js — Vercel Serverless Function for shared game state
//
// Games are persisted in Firebase Realtime Database so players on different
// devices can join using the same shared code/link.

'use strict';

const FIREBASE_DATABASE_URL = (process.env.FIREBASE_DATABASE_URL || 'https://connections-947aa-default-rtdb.europe-west1.firebasedatabase.app').replace(/\/+$/, '');

function gamePath(code) {
  return `${FIREBASE_DATABASE_URL}/games/${encodeURIComponent(code)}.json`;
}

async function dbGetGame(code) {
  const res = await fetch(gamePath(code));
  if (!res.ok) throw new Error(`DB read failed (${res.status})`);
  return res.json();
}

async function dbSetGame(code, game) {
  const res = await fetch(gamePath(code), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error(`DB write failed (${res.status})`);
}

/** Lightweight view: participants + version, no photo data. */
function gameMeta(game) {
  return {
    code: game.code,
    title: game.title,
    creator: game.creator,
    participants: game.participants,
    entryCount: Object.keys(game.entries || {}).length,
    version: game.version,
    createdAt: game.createdAt,
  };
}

module.exports = async function handler(req, res) {
  // Allow any origin — the game link is meant to be shared publicly.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const code = ((req.query && req.query.code) || '').trim().toUpperCase();
  const metaOnly = req.query && req.query.meta === '1';

  // ── GET /api/game?code=XXXX[&meta=1] ─────────────────────────────────────
  if (req.method === 'GET') {
    if (!code) return res.status(400).json({ error: 'code required' });
    const game = await dbGetGame(code);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    return res.status(200).json(metaOnly ? gameMeta(game) : game);
  }

  // ── POST /api/game  { code, title, creator } ──────────────────────────────
  if (req.method === 'POST') {
    const body = req.body || {};
    const { title, creator } = body;
    const newCode = (body.code || '').trim().toUpperCase();
    if (!newCode || !title || !creator) {
      return res.status(400).json({ error: 'code, title, and creator are required' });
    }
    const game = {
      code: newCode,
      title,
      creator,
      participants: { [creator]: true },
      entries: {},
      createdAt: Date.now(),
      version: 1,
    };
    await dbSetGame(newCode, game);
    return res.status(201).json(game);
  }

  // ── PATCH /api/game?code=XXXX  { participant?, entries?, deleteEntry? } ───
  if (req.method === 'PATCH') {
    if (!code) return res.status(400).json({ error: 'code required' });
    const game = await dbGetGame(code);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const body = req.body || {};
    if (body.participant && typeof body.participant === 'string') {
      game.participants[body.participant] = true;
    }
    if (body.entries && typeof body.entries === 'object' && !Array.isArray(body.entries)) {
      Object.assign(game.entries, body.entries);
    }
    if (body.deleteEntry && typeof body.deleteEntry === 'string') {
      delete game.entries[body.deleteEntry];
    }
    game.version = (game.version || 1) + 1;

    await dbSetGame(code, game);
    return res.status(200).json(metaOnly ? gameMeta(game) : game);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

// Increase body-size limit so compressed photo payloads fit comfortably.
module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};
