import { ActionRowBuilder, Interaction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import Company from "../database/models/Company";
import { registerUserData } from "../globals";
import { BaseModalSubmit } from "./BaseModalSubmit";



export class RegisterModalSubmit extends BaseModalSubmit {

  constructor() {
    super({
      customId: "register-modal",
    })
  }

  async execute(interaction: Interaction): Promise<void> {


    if (!interaction.isModalSubmit()) return;


    const email = interaction.fields.getTextInputValue("email")
    const firstName = interaction.fields.getTextInputValue("first_name");
    const lastName = interaction.fields.getTextInputValue("last_name");

    registerUserData.set(interaction.user.id, {
      email, firstName, lastName
    });


    const companies = await Company.findAll();

    const builders = companies.map((company) => {
      return new StringSelectMenuOptionBuilder()
          .setLabel(company.name)
          .setValue(''+company.id)
    })

    const companySelector = new StringSelectMenuBuilder()
      .setCustomId('register-company-selector')
      .setPlaceholder('Select the company your are working on')
      .addOptions(builders);


    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(companySelector);

     await interaction.reply({
      content: "Select the company your are working on",
      components: [row],
      ephemeral: true
    });










  }
}
