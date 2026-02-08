// src/commands/setbumps.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { setBumps, getBumps } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setbumps')
    .setDescription('Set the exact bump count of a user (admin/testing)')
    .addUserOption(opt =>
      opt
        .setName('user')
        .setDescription('User to set bumps for')
        .setRequired(true)
    )
    .addIntegerOption(opt =>
      opt
        .setName('amount')
        .setDescription('Number of bumps')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    const guildId = interaction.guildId;

    await setBumps(guildId, user.id, amount);
    const total = await getBumps(guildId, user.id);

    await interaction.reply(
      `🧪 Set <@${user.id}> bumps to **${total}**`
    );
  },
};
