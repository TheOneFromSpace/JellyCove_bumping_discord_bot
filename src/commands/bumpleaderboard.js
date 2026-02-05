const { SlashCommandBuilder } = require('discord.js');
const { leaderboards } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bumpleaderboard')
    .setDescription('Show the bump leaderboard'),

  async execute(interaction) {
    const board = leaderboards.get(interaction.guildId);

    if (!board || board.size === 0) {
      return interaction.reply('No bumps recorded yet!');
    }

    const sorted = [...board.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const text = sorted
      .map(([id, count], i) => `**${i + 1}.** <@${id}> — ${count}`)
      .join('\n');

    await interaction.reply(`🏆 **Bump Leaderboard**\n\n${text}`);
  },
};
