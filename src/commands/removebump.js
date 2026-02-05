// src/commands/removebump.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { leaderboards } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removebump')
    .setDescription('Remove bumps from a user (admin/testing)')
    .addUserOption(opt => opt
      .setName('user')
      .setDescription('User to remove bumps from')
      .setRequired(true)
    )
    .addIntegerOption(opt => opt
      .setName('amount')
      .setDescription('Number of bumps to remove')
      .setMinValue(1)
      .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    const guildId = interaction.guildId;

    if (!leaderboards.has(guildId)) leaderboards.set(guildId, new Map());
    const board = leaderboards.get(guildId);

    const current = board.get(user.id) || 0;
    const newTotal = Math.max(0, current - amount);
    board.set(user.id, newTotal);

    await interaction.reply(
      `Removed **${amount}** bump(s) from <@${user.id}>. New total: **${newTotal}**`
    );
  },
};
