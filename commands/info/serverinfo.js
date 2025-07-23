// /commands/info/serverinfo.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about this server.'),
  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setTitle(`🌐 Server Info: ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor('Green')
      .addFields(
        { name: '<a:info:1115209833218588722:> Server ID', value: guild.id, inline: true },
        { name: '<a:owner:1017416872515346462:> Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '<a:info:1115209833218588722:> Members', value: `${guild.memberCount}`, inline: true },
        { name: '<a:info:1115209833218588722:> Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: '<a:info:1115209833218588722:> Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: '<a:info:1115209833218588722:> Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  }
};
