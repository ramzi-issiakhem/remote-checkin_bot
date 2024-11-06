import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandType } from '.';
import { Command } from './BaseCommand';



export class CheckInCommand extends Command {

	constructor() {
		super({
			name: "check-in",
		    description: 'Register your checkin in the sytem, please first register with /remote-register!'
		})
	}

	async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
		await interaction.reply({content: 'Pong'});
	}
}