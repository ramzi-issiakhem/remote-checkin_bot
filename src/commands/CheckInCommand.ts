import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandType } from '.';
import { Command } from './BaseCommand';
import  Employee  from '../database/models/Employee';



export class CheckInCommand extends Command {

	constructor() {
		super({
			name: "check-in",
		    description: 'Register your checkin in the sytem, please first register with /remote-register!'
		})
	}

	async execute(interaction: CommandInteraction<CacheType>): Promise<void> {

		
			if (!interaction.isChatInputCommand()) return;

		const employee = await Employee.findOne({where: {"user_id": interaction.user.id}});
		if (!employee) {
			await interaction.user.send("You need first to register yourself as an employee by executing /remote-register");
			await interaction.reply({
				content: "You need first to register yourself as an employee by executing /remote-register",
				ephemeral: true
			})
		} else {
			await interaction.reply({content: 'Pong'});
		}
	}
}
