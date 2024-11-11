import { ActionRowBuilder, Interaction, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { createEmployee } from "../database/dal/EmployeeDal";
import Employee from "../database/models/Employee";
import { registerUserData } from "../globals";
import { BaseModalSubmit } from "./BaseModalSubmit";



export class RegisterCompanySelector extends BaseModalSubmit {

  constructor() {
    super({
      customId: "register-company-selector",
    })
  }

  async execute(interaction: Interaction): Promise<void> {


    if (!interaction.isStringSelectMenu()) return;
    const selectMenuInteraction = interaction as StringSelectMenuInteraction;

    const data = registerUserData.get(interaction.user.id);
    const { email = 'Not provided', firstName = 'Not provided', lastName = 'Not provided' } = data || {};

    const selectedCompanyId = selectMenuInteraction.values[0];
    const selectedCompanyName = selectMenuInteraction.component.options.filter(obj => obj.value == selectedCompanyId)[0].label;

    createEmployee({
      first_name: firstName,
      last_name: lastName,
      email: email,
      company_id: parseInt(selectedCompanyId),
      user_id: interaction.user.id
    });
    

    await interaction.reply(`${lastName} ${firstName}, you just been assigned to the company : ${selectedCompanyName}`);
  }
}
