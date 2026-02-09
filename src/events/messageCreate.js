const { Events } = require('discord.js');
const { addBumps, getBumps } = require('../data/bumps');

const DISBOARD_BOT_ID = '302050872383242240';

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Must be in a guild
    if (!message.guild) return;

    // Must be DISBOARD
    if (message.author.id !== DISBOARD_BOT_ID) return;

    // Must be a response to an interaction (/bump)
    if (!message.interaction) return;

    // Must contain an embed
    if (!message.embeds.length) return;

    const embed = message.embeds[0];
    const description = embed.description?.toLowerCase() ?? '';

    // Detect successful bump
    if (!description.includes('bump done')) return;

    // ✅ THIS is the bumper
    const userId = message.interaction.user.id;

    await addBumps(message.guildId, userId, 1);
    const total = await getBumps(message.guildId, userId);

    await message.channel.send(
      `🚀 <@${userId}> bumped the server!\nThey now have **${total}** bumps.`
    );
  },
};
