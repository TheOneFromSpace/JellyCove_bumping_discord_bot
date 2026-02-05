// guildId -> userId
const pendingBumps = new Map();

// guildId -> Map(userId -> count)
const leaderboards = new Map();

module.exports = {
  pendingBumps,
  leaderboards,
};
