const { SlashCommandBuilder } = require('discord.js');
const { getBumps } = require('../data/bumps');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bumps')
    .setDescription("Check your or another user's total bumps")
    .addUserOption(opt =>
      opt
        .setName('user')
        .setDescription('User to check')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const guildId = interaction.guildId;

    const count = await getBumps(guildId, user.id);

    await interaction.reply({
      content: `<@${user.id}> has **${count}** bumps.`,
      allowedMentions: { users: [] },
    });
  },
};
