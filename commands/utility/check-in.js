const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-in')
		.setDescription('Register your checkin in the sytem, please first register with /remote-register!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
