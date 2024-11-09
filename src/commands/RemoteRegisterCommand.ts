import { ActionRowBuilder, CacheType, CommandInteraction, MessageActionRowComponentBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { Command } from './BaseCommand';



export class RemoteRegisterCommand extends Command {

	constructor() {
		super({
			name: "remote-register",
		    description: 'Register yourself as an employee'
		})
	}

	async execute(interaction: CommandInteraction<CacheType>): Promise<void> {

		if (!interaction.isChatInputCommand()) return;

		const modal = new ModalBuilder()
				.setCustomId('modal-register-employee')
				.setTitle('Register Yourself');

		const firstNameInput = new TextInputBuilder()
			.setCustomId('modal-register-employee-first-name-input')
			.setLabel('Please Insert Your First Name')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);
		
		const lastNameInput = new TextInputBuilder()
			.setCustomId('modal-register-employee-last-name-input')
			.setLabel('Please Insert Your Last Name')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);
        
		const companySelector = new StringSelectMenuBuilder()
			.setCustomId('register-company-selector')
			.setPlaceholder('Select the company your are working on')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Fatoura')
					.setValue("12")
			);
	
      const firstNameRow = new ActionRowBuilder()
          .addComponents(firstNameInput);

          const lastNameRow = new ActionRowBuilder()
          .addComponents(lastNameInput);

			const companyRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
			.addComponents(companySelector);

		
		await interaction.reply({
			components: [firstNameRow,lastNameRow,companyRow]
		});
	}
}
