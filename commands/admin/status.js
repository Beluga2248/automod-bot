const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('View the current Automod toggle status for this server'),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    let settings = await GuildSettings.findOne({ guildId });
    if (!settings) {
      settings = new GuildSettings({ guildId });
      await settings.save();
    }

    const status = (flag) => flag ? '<a:Yes:1011614293420150805> Enabled' : '<a:Wrong:1017416697168269372> Disabled';

    const embed = new EmbedBuilder()
      .setTitle(`<a:Moderation:1115208500172292127> Automod Status for ${interaction.guild.name}`)
      .setColor('Blue')
      .addFields(
        { name: 'Automod', value: status(settings.automodEnabled), inline: true },
        { name: 'Anti-Link', value: status(settings.antiLink), inline: true },
        { name: 'Anti-Spam', value: status(settings.antiSpam), inline: true },
        { name: 'Anti-GhostPing', value: status(settings.antiGhostPing), inline: true },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
