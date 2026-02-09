const { Events, PermissionsBitField } = require('discord.js');
const { addBumps, getBumps } = require('../data/bumps');

const DISBOARD_BOT_ID = '302050872383242240';

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    try {
      // --------------------
      // Basic guards
      // --------------------
      if (!message.guild) return;
      if (message.author.id !== DISBOARD_BOT_ID) return;

      // DISBOARD bump responses are interaction replies
      if (!message.interaction) return;

      // Must contain an embed
      if (!message.embeds || message.embeds.length === 0) return;

      const embed = message.embeds[0];
      const description = embed.description?.toLowerCase() ?? '';

      // --------------------
      // Detect successful bump
      // --------------------
      if (!description.includes('bump done')) return;

      // This is the user who ran /bump
      const userId = message.interaction.user.id;
      const guildId = message.guildId;

      console.log('[DEBUG] Bump detected');
      console.log('[DEBUG] Guild:', guildId);
      console.log('[DEBUG] User:', userId);
      console.log('[DEBUG] Channel:', message.channel?.id);

      // --------------------
      // Database update
      // --------------------
      await addBumps(guildId, userId, 1);
      const total = await getBumps(guildId, userId);

      console.log('[DEBUG] DB updated, total bumps:', total);

      // --------------------
      // Permission debug
      // --------------------
      const me = message.guild.members.me;

      if (!me) {
        console.warn('[WARN] Bot member not cached');
        return;
      }

      const perms = message.channel.permissionsFor(me);

      const canSend =
        perms?.has(PermissionsBitField.Flags.SendMessages) ||
        perms?.has(PermissionsBitField.Flags.SendMessagesInThreads);

      console.log('[DEBUG] Can send messages:', canSend);

      // --------------------
      // Send confirmation (safe)
      // --------------------
      if (!canSend) {
        console.warn('[WARN] Missing send permissions in this channel/thread');
        return;
      }

      await message.channel.send(
        `🚀 <@${userId}> bumped the server!\nThey now have **${total}** bumps.`
      );

      console.log('[DEBUG] Confirmation message sent');
    } catch (err) {
      // --------------------
      // HARD SAFETY NET
      // --------------------
      console.error('[DISBOARD EVENT ERROR]');
      console.error(err);
    }
  },
};
