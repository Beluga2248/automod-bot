const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antispam')
    .setDescription('Enable or disable anti-spam protection.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    let settings = await GuildSettings.findOne({ guildId }) || new GuildSettings({ guildId });

    settings.antiSpam = !settings.antiSpam;
    await settings.save();

    const embed = new EmbedBuilder()
      .setTitle('Anti-Spam Toggled')
      .setDescription(`Anti-spam protection is now **${settings.antiSpam ? 'enabled <a:Yes:1011614293420150805:>' : 'disabled <a:Wrong:1017416697168269372:>'}**.`)
      .setColor(settings.antiSpam ? 'Green' : 'Red');

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
