const pool = require('../db');

// ---------------------
// Add bumps
// ---------------------
async function addBumps(guildId, userId, amount = 1) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO bumps (guild_id, user_id, bumps)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bumps = bumps + ?`,
      [guildId, userId, amount, amount]
    );
  } catch (err) {
    console.error('DB error in addBumps:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// ---------------------
// Remove bumps
// ---------------------
async function removeBumps(guildId, userId, amount) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE bumps
       SET bumps = GREATEST(0, bumps - ?)
       WHERE guild_id = ? AND user_id = ?`,
      [amount, guildId, userId]
    );
  } catch (err) {
    console.error('DB error in removeBumps:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// ---------------------
// Set bumps
// ---------------------
async function setBumps(guildId, userId, amount) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO bumps (guild_id, user_id, bumps)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bumps = ?`,
      [guildId, userId, amount, amount]
    );
  } catch (err) {
    console.error('DB error in setBumps:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// ---------------------
// Get one user's bumps
// ---------------------
async function getBumps(guildId, userId) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT bumps FROM bumps WHERE guild_id = ? AND user_id = ?`,
      [guildId, userId]
    );
    return rows[0]?.bumps ?? 0;
  } catch (err) {
    console.error('DB error in getBumps:', err);
    return 0;
  } finally {
    if (conn) conn.release();
  }
}

// ---------------------
// Leaderboard
// ---------------------
async function getLeaderboard(guildId, limit = 10) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(
      `SELECT user_id, bumps
       FROM bumps
       WHERE guild_id = ?
       ORDER BY bumps DESC
       LIMIT ?`,
      [guildId, limit]
    );
  } catch (err) {
    console.error('DB error in getLeaderboard:', err);
    return [];
  } finally {
    if (conn) conn.release();
  }
}

// ---------------------
// shutdown helper
// ---------------------
async function shutdownPool() {
  try {
    console.log('🔻 Closing DB pool...');
    await pool.end();
  } catch (err) {
    console.error('Error closing pool:', err);
  }
}

module.exports = {
  addBumps,
  removeBumps,
  setBumps,
  getBumps,
  getLeaderboard,
  shutdownPool,
};
