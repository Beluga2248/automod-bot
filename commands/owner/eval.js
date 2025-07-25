const { SlashCommandBuilder } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates JavaScript code (Bot Owner only)')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('JavaScript code to run')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== '951332179357614110') return interaction.reply({ content: '❌ You are not authorized.', ephemeral: true });

        const code = interaction.options.getString('code');
        try {
            let evaled = await eval(code);
            if (typeof evaled !== 'string') evaled = inspect(evaled);

            await interaction.reply({ content: `<a:Yes:1011614293420150805> \`\`\`js\n${evaled}\n\`\`\`` });
        } catch (err) {
            await interaction.reply({ content: `<a:Wrong:1017416697168269372> \`\`\`js\n${err}\n\`\`\``, ephemeral: true });
        }
    }
};
