const { SlashCommandBuilder } = require('discord.js');
const { getLeaderboard } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bumpleaderboard')
    .setDescription('Show the bump leaderboard'),

  async execute(interaction) {
    const rows = await getLeaderboard(interaction.guildId, 10);

    if (!rows.length) {
      return interaction.reply('No bumps recorded yet!');
    }

    const text = rows
      .map((row, i) => `**${i + 1}.** <@${row.user_id}> — ${row.bumps}`)
      .join('\n');

    await interaction.reply(`🏆 **Bump Leaderboard**\n\n${text}`);
  },
};
