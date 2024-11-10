import { ActionRowBuilder, Interaction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
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

    const data = registerUserData.get(interaction.user.id);
    const { email = 'Not provided', firstName = 'Not provided', lastName = 'Not provided' } = data || {};


    await interaction.reply("GOT IT" + email + lastName + firstName); 
  }
}
