const { Events } = require('discord.js');
const { pendingBumps, leaderboards } = require('../data/bumps');

const DISBOARD_BOT_ID = '302050872383242240';

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.guild) return;
    if (message.author.id !== DISBOARD_BOT_ID) return;

    const content = message.content.toLowerCase();

    // DISBOARD prompt
    if (content.includes('please bump this server')) {
      const user = message.mentions.users.first();
      if (user) {
        pendingBumps.set(message.guildId, user.id);
      }
      return;
    }

    // Bump success
    if (content.includes('bump done')) {
      const userId = pendingBumps.get(message.guildId);
      if (!userId) return;

      if (!leaderboards.has(message.guildId)) {
        leaderboards.set(message.guildId, new Map());
      }

      const board = leaderboards.get(message.guildId);
      board.set(userId, (board.get(userId) || 0) + 1);

      pendingBumps.delete(message.guildId);

      await message.channel.send(
        `🚀 <@${userId}> bumped the server!\nThey now have **${board.get(userId)}** bumps.`
      );
    }
  },
};
