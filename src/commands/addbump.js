const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require('discord.js');

const { addBumps, getBumps } = require('../data/bumps');

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

    await addBumps(guildId, user.id, amount);
    const total = await getBumps(guildId, user.id);

    await interaction.reply(
      `🧪 Added **${amount}** bump(s) to <@${user.id}>.\n` +
      `They now have **${total}** total bumps.`
    );
  },
};
