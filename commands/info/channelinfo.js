// /commands/info/channelinfo.js
const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription('Displays information about a channel.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to get info on')
        .setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    const embed = new EmbedBuilder()
      .setTitle(`📺 Channel Info: ${channel.name}`)
      .setColor('Blue')
      .addFields(
        { name: '<a:info:1115209833218588722:> ID', value: channel.id, inline: true },
        { name: '<a:info:1115209833218588722:> Type', value: ChannelType[channel.type], inline: true },
        { name: '<a:info:1115209833218588722:> NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true },
        { name: '<a:info:1115209833218588722:> Created', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  }
};
