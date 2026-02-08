// src/commands/removebump.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { removeBumps, getBumps } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removebump')
    .setDescription('Remove bumps from a user (admin/testing)')
    .addUserOption(opt =>
      opt
        .setName('user')
        .setDescription('User to remove bumps from')
        .setRequired(true)
    )
    .addIntegerOption(opt =>
      opt
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

    await removeBumps(guildId, user.id, amount);
    const total = await getBumps(guildId, user.id);

    await interaction.reply(
      `🧪 Removed **${amount}** bump(s) from <@${user.id}>.\n` +
      `They now have **${total}** total bumps.`
    );
  },
};
