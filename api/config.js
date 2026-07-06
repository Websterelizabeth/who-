// api/config.js — Returns public client configuration
//
// Exposes only the Firebase Realtime Database URL so the browser can
// open a direct SSE stream for real-time updates.  The admin secret is
// intentionally NOT included here.

'use strict';

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').trim().replace(/\/+$/, '');
  return res.status(200).json({ databaseUrl: databaseUrl || null });
};
