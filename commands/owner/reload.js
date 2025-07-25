const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload a command (Bot Owner only)')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Name of the command to reload')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== '951332179357614110') return interaction.reply({ content: '❌ You are not authorized.', ephemeral: true });

        const commandName = interaction.options.getString('command').toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply({ content: `<a:Wrong:1017416697168269372> Command \`${commandName}\` not found.`, ephemeral: true });
        }

        const commandFoldersPath = path.join(__dirname, '../');
        const folder = fs.readdirSync(commandFoldersPath).find(folder => fs.existsSync(`${commandFoldersPath}/${folder}/${commandName}.js`));

        if (!folder) return interaction.reply({ content: '<a:Wrong:1017416697168269372> Command file not found.', ephemeral: true });

        delete require.cache[require.resolve(`../${folder}/${commandName}.js`)];

        try {
            const newCommand = require(`../${folder}/${commandName}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply({ content: `✅ Successfully reloaded \`${commandName}\`.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `❌ Error while reloading \`${commandName}\`: \n\`${error.message}\``, ephemeral: true });
        }
    }
};
