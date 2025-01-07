import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import { grantAccessToManagmentCommand } from '../utils/helpers';
import Company from '../database/models/Company';
import { createUniqueCompany } from '../database/dal/CompanyDal';



export class CreateCompanyCommand extends Command {

  constructor() {
    super({
      name: "add-company",
      description: 'Add the company you just created ',
      options: [
        { "type": "string", name: "name", description: "Define the company name", required: true },
        { "type": "string", name: "description", description: "Describe the company", required: false }
      ]
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {


    if (!interaction.isChatInputCommand()) return;

    if (!grantAccessToManagmentCommand(interaction)) return ;

    const companyName = interaction.options.get('name')?.value as string | undefined;
    const companyDescription = interaction.options.get('description')?.value as string | undefined;

    if (!companyName) {
      interaction.reply({
        content: "You need to define the name of the company you wanna create in the database",
        ephemeral: true
      });
      return;
    }


    const createdCompanyResult = await createUniqueCompany({
      name: companyName,
      description: companyDescription
    });


    if (createdCompanyResult == null) {
      await interaction.reply({content:`Error: The company already exists`, ephemeral: true});
      return;
    } else {
      await interaction.reply({ content: `Congratulations ! You just created the company ${companyName}`, ephemeral: true });
    }



  }
}
