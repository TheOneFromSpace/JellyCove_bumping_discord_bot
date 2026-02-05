// src/commands/bumps.js
const { SlashCommandBuilder } = require('discord.js');
const { leaderboards } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bumps')
    .setDescription('Check your or another user\'s total bumps')
    .addUserOption(opt =>
      opt.setName('user')
        .setDescription('User to check')
        .setRequired(false)
    ),

  async execute(interaction) {
    const guildId = interaction.guildId;
    const user = interaction.options.getUser('user') || interaction.user;

    if (!leaderboards.has(guildId)) leaderboards.set(guildId, new Map());
    const board = leaderboards.get(guildId);
    const count = board.get(user.id) || 0;

    await interaction.reply(`<@${user.id}> has **${count}** bumps.`);
  },
};
