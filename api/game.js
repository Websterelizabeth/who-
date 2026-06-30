// api/game.js — Vercel Serverless Function for shared game state
//
// Games are stored in Firebase Realtime Database so all devices share the same
// state and data survives serverless cold starts.

'use strict';

const FIREBASE_DATABASE_URL = (process.env.FIREBASE_DATABASE_URL || '').trim().replace(/\/+$/, '');
const FIREBASE_DATABASE_SECRET = (process.env.FIREBASE_DATABASE_SECRET || '').trim();
const GAME_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function isStorageConfigured() {
  return !!FIREBASE_DATABASE_URL;
}

function dbUrl(path) {
  const suffix = FIREBASE_DATABASE_SECRET
    ? `?auth=${encodeURIComponent(FIREBASE_DATABASE_SECRET)}`
    : '';
  return `${FIREBASE_DATABASE_URL}${path}.json${suffix}`;
}

async function dbGet(path) {
  const response = await fetch(dbUrl(path));
  if (!response.ok) throw new Error(`Firebase GET failed (${response.status})`);
  return response.json();
}

async function dbPut(path, value) {
  const response = await fetch(dbUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
  if (!response.ok) throw new Error(`Firebase PUT failed (${response.status})`);
  return response.json();
}

/** Mark stale games as expired and hide them from active gameplay. */
function isExpired(game) {
  if (!game || !game.createdAt) return true;
  return game.createdAt < Date.now() - GAME_TTL_MS;
}

async function getGame(code) {
  const game = await dbGet(`/games/${encodeURIComponent(code)}`);
  if (!game || isExpired(game)) return null;
  return game;
}

function storageError(res, err) {
  console.error('Storage error:', err);
  return res.status(503).json({ error: 'Game service unavailable. Please try again.' });
}

function ensureStorage(res) {
  if (isStorageConfigured()) return true;
  res.status(500).json({ error: 'Server storage is not configured.' });
  return false;
}

function normalizeGame(game, code) {
  return {
    code,
    title: game.title,
    creator: game.creator,
    participants: game.participants || {},
    entries: game.entries || {},
    createdAt: game.createdAt || Date.now(),
    version: game.version || 1,
  };
}

function incrementVersion(game) {
  const current = Number.isFinite(game.version) ? game.version : 1;
  game.version = current + 1;
  return game;
}

function validBodyObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function validString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validCode(value) {
  return (value || '').trim().toUpperCase();
}

function parseBody(req) {
  return validBodyObject(req.body) ? req.body : {};
}

async function saveGame(code, game) {
  const normalized = normalizeGame(game, code);
  await dbPut(`/games/${encodeURIComponent(code)}`, normalized);
  return normalized;
}

function applyPatch(game, body) {
  if (validString(body.participant)) {
    const participant = body.participant.trim();
    game.participants[participant] = true;
  }
  if (validBodyObject(body.entries)) {
    Object.assign(game.entries, body.entries);
  }
  if (validString(body.deleteEntry)) {
    delete game.entries[body.deleteEntry.trim()];
  }
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
  if (!ensureStorage(res)) return;

  const code = validCode(req.query && req.query.code);
  const metaOnly = req.query && req.query.meta === '1';

  // ── GET /api/game?code=XXXX[&meta=1] ─────────────────────────────────────
  if (req.method === 'GET') {
    if (!code) return res.status(400).json({ error: 'code required' });
    let game;
    try {
      game = await getGame(code);
    } catch (err) {
      return storageError(res, err);
    }
    if (!game) return res.status(404).json({ error: 'Game not found' });
    return res.status(200).json(metaOnly ? gameMeta(game) : game);
  }

  // ── POST /api/game  { code, title, creator } ──────────────────────────────
  if (req.method === 'POST') {
    const body = parseBody(req);
    const { title, creator } = body;
    const newCode = validCode(body.code);
    if (!newCode || !title || !creator) {
      return res.status(400).json({ error: 'code, title, and creator are required' });
    }
    try {
      const existing = await getGame(newCode);
      if (existing) return res.status(409).json({ error: 'Game code already exists' });
    } catch (err) {
      return storageError(res, err);
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
    try {
      const saved = await saveGame(newCode, game);
      return res.status(201).json(saved);
    } catch (err) {
      return storageError(res, err);
    }
  }

  // ── PATCH /api/game?code=XXXX  { participant?, entries?, deleteEntry? } ───
  if (req.method === 'PATCH') {
    if (!code) return res.status(400).json({ error: 'code required' });
    let game;
    try {
      game = await getGame(code);
    } catch (err) {
      return storageError(res, err);
    }
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const body = parseBody(req);
    applyPatch(game, body);
    incrementVersion(game);

    try {
      const saved = await saveGame(code, game);
      return res.status(200).json(metaOnly ? gameMeta(saved) : saved);
    } catch (err) {
      return storageError(res, err);
    }
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
