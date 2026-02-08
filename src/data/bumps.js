const pool = require('../db');

// ---------------------
// Add bumps
// ---------------------
async function addBumps(guildId, userId, amount = 1) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO bumps (guild_id, user_id, bumps)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bumps = bumps + ?`,
      [guildId, userId, amount, amount]
    );
  } finally {
    conn.release();
  }
}

// ---------------------
// Remove bumps
// ---------------------
async function removeBumps(guildId, userId, amount) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `UPDATE bumps
       SET bumps = GREATEST(0, bumps - ?)
       WHERE guild_id = ? AND user_id = ?`,
      [amount, guildId, userId]
    );
  } finally {
    conn.release();
  }
}

// ---------------------
// Set bumps
// ---------------------
async function setBumps(guildId, userId, amount) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO bumps (guild_id, user_id, bumps)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bumps = ?`,
      [guildId, userId, amount, amount]
    );
  } finally {
    conn.release();
  }
}

// ---------------------
// Get one user's bumps
// ---------------------
async function getBumps(guildId, userId) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT bumps FROM bumps WHERE guild_id = ? AND user_id = ?`,
      [guildId, userId]
    );
    return rows[0]?.bumps ?? 0;
  } finally {
    conn.release();
  }
}

// ---------------------
// Leaderboard
// ---------------------
async function getLeaderboard(guildId, limit = 10) {
  const conn = await pool.getConnection();
  try {
    return await conn.query(
      `SELECT user_id, bumps
       FROM bumps
       WHERE guild_id = ?
       ORDER BY bumps DESC
       LIMIT ?`,
      [guildId, limit]
    );
  } finally {
    conn.release();
  }
}

module.exports = {
  addBumps,
  removeBumps,
  setBumps,
  getBumps,
  getLeaderboard,
};
