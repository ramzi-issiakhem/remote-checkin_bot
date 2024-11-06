import { Events } from 'discord.js';
import { BaseEvent } from './BaseEvent';
import { commands } from '../commands';



export class InteractionCreateEvent extends BaseEvent {

	constructor() {
		super({
			name: Events.InteractionCreate,
			once: false
		})
	}

	async execute(interaction: any): Promise<any> {
		
			if (!interaction.isChatInputCommand()) return;

			console.log(commands);
			
			const command = commands[interaction.commandName];
			
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
	
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
	}
}