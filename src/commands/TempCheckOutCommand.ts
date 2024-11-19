import { Command } from './BaseCommand';
import { ActivityTypeEnum } from '../database/types';
import { createActivity } from '../database/dal/ActivityDal';
import { handleTimeOption, isStringValidTime, verifyEmployeeLastActivityDifferent, verifyEmployeeRegisteredAndRetrieve } from '../utils/helpers';
import { CacheType, CommandInteraction } from 'discord.js';



export class TempCheckOutCommand extends Command {

  constructor() {
    super({
      name: "temp-check-out",
      description: 'Register your temporary checkout in the sytem',
      options: [
        { "type": "string", name: "time", description: "Define the time you temporary checked-out in case you forget in format of HH:mm like 18:00", required: false }
      ]
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {


    if (!interaction.isChatInputCommand()) return;

    //Verify if the user is registered in a company
    const employee = await verifyEmployeeRegisteredAndRetrieve(interaction);
    if (!employee) return



    //Verify if the user is not already checked out 
    const firstResponse = await verifyEmployeeLastActivityDifferent(interaction, employee?.id, ActivityTypeEnum.CheckOut, 'You are  checked out , You cannot temporarily checkout again');
    const secondResponse = await verifyEmployeeLastActivityDifferent(interaction, employee?.id, ActivityTypeEnum.TempCheckOut, 'You are already checked out temporarily, you cannot temporarily check out again');
    if (!firstResponse || !secondResponse) {
      return
    }

    const data = await handleTimeOption(interaction);
    if (!data) return;
    const { today, createdAtString } = data;


    await createActivity({
      type: ActivityTypeEnum.CheckOut,
      employee_id: employee.get("id"),
      createdAt: today,
    });

    if (createdAtString) {
      await interaction.reply(`${employee.last_name} ${employee.first_name} forgot to check-out temporarily at ${createdAtString} !`);
    } else {
      await interaction.reply(`${employee.last_name} ${employee.first_name} has just checked out temporarily!`);
    }


  }
}
