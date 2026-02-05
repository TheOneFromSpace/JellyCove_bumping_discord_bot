const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require('discord.js');

const { leaderboards } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addbump')
    .setDescription('Manually add bumps to a user (Admin/Testing)')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to add bumps to')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Number of bumps to add')
        .setMinValue(1)
        .setRequired(true)
    )
  
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    const guildId = interaction.guildId;

    if (!leaderboards.has(guildId)) {
      leaderboards.set(guildId, new Map());
    }

    const board = leaderboards.get(guildId);
    board.set(user.id, (board.get(user.id) || 0) + amount);

    await interaction.reply(
      `Added **${amount}** bump(s) to <@${user.id}>.\n` +
      `They now have **${board.get(user.id)}** total bumps.`
    );
  },
};
