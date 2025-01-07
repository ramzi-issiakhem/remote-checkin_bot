import { ActionRowBuilder, CacheType, CommandInteraction, MessageActionRowComponentBuilder, ModalActionRowComponentBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { getEmployeeByUserId, getEmployeeCompany } from '../database/dal/EmployeeDal';
import Company from '../database/models/Company';
import Employee from '../database/models/Employee';
import { Command } from './BaseCommand';



export class RemoteRegisterCommand extends Command {

  constructor() {
    super({
      name: "remote-register",
      description: 'Register yourself as an employee',
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {

    if (!interaction.isChatInputCommand()) return;

    if (await Company.count() < 1) {
      await interaction.reply({
        content: "Error: No Company exist, please ask your administrator to create them !",
        ephemeral: true
      })

      return;
    }

    const employee = await getEmployeeByUserId(interaction.user.id);
    if (employee != null) {
      const company = await getEmployeeCompany(employee);

      await interaction.reply({
        content: "Error: You already registered as an employee of the company : " +  company?.name,
        ephemeral: true
      })

      return;

    }

    const modal = new ModalBuilder()
      .setCustomId('register-modal')
      .setTitle('Registration Form');

    // First name input
    const firstNameInput = new TextInputBuilder()
      .setCustomId('first_name')
      .setLabel('First Name')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Enter your first name')
      .setRequired(true);

    // Last name input
    const lastNameInput = new TextInputBuilder()
      .setCustomId('last_name')
      .setLabel('Last Name')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Enter your last name')
      .setRequired(true);

    const emaiInput = new TextInputBuilder()
      .setCustomId('email')
      .setLabel('Email')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Enter your email')
      .setRequired(true);


    // Select menu input
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('option_select')
      .setPlaceholder('Choose an option')
      .addOptions([
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
        { label: 'Option 3', value: 'option_3' },
      ]);

    // Add inputs to the modal
    const firstNameRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(firstNameInput);
    const lastNameRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(lastNameInput);
    const emailRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(emaiInput);

    modal.addComponents(firstNameRow, lastNameRow, emailRow);

    // Show the modal to the user
    await interaction.showModal(modal);


  }
}
