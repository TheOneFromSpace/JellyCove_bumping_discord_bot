const { Events } = require('discord.js');
const { addBumps, getBumps } = require('../data/bumps');

const DISBOARD_BOT_ID = '302050872383242240';

// In-memory, short-lived tracking, can be checked to be deleted next patch
const pendingBumps = new Map();

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.guild) return;
    if (message.author.id !== DISBOARD_BOT_ID) return;

    const content = message.content.toLowerCase();

    // DISBOARD bump prompt?
    if (content.includes('please bump this server')) {
      const user = message.mentions.users.first();
      if (user) {
        pendingBumps.set(message.guildId, user.id);
      }
      return;
    }

    // DISBOARD bump success, base of the entire script
    if (content.includes('bump done')) {
      const userId = pendingBumps.get(message.guildId);
      if (!userId) return;

      await addBumps(message.guildId, userId, 1);
      const total = await getBumps(message.guildId, userId);

      pendingBumps.delete(message.guildId);

      await message.channel.send(
        `<@${userId}> bumped the server!\nThey now have **${total}** bumps.`
      );
    }
  },
};
