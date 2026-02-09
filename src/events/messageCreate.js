const { Events } = require('discord.js');
const { addBumps, getBumps } = require('../data/bumps');

const DISBOARD_BOT_ID = '302050872383242240';

// Short-lived memory to link bump → user
const pendingBumps = new Map();

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Must be in a guild
    if (!message.guild) return;

    // Must be DISBOARD
    if (message.author.id !== DISBOARD_BOT_ID) return;

    // Must contain an embed
    if (!message.embeds.length) return;

    // Get embed
    const embed = message.embeds[0];
    const description = embed.description?.toLowerCase() ?? '';

    //  Detect bump
    if (!description.includes('bump done')) return;

    const userId = pendingBumps.get(message.guildId);
    if (!userId) return;

    await addBumps(message.guildId, userId, 1);
    const total = await getBumps(message.guildId, userId);

    pendingBumps.delete(message.guildId);

    await message.channel.send(
      `🚀 <@${userId}> bumped the server!\nThey now have **${total}** bumps.`
    );
  },
};

// Export map so interaction handler can set it
module.exports.pendingBumps = pendingBumps;
