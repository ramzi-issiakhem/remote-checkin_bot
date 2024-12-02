import { Command } from './BaseCommand';
import { ActivityTypeEnum } from '../database/types';
import { createActivity, getLastActivityFromEmployeeId } from '../database/dal/ActivityDal';
import { handleTimeOption, isStringValidTime, verifyEmployeeLastActivityDifferent, verifyEmployeeRegisteredAndRetrieve } from '../utils/helpers';
import { CacheType, CommandInteraction } from 'discord.js';



export class TempCheckOutCommand extends Command {

  constructor() {
    super({
      name: "temp-check-out",
      description: 'Register your temporary checkout in the sytem',
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

    const lastActivity = await getLastActivityFromEmployeeId(employee.id);
    if (!lastActivity) {
      await interaction.reply({ content: "You can't temporary checkout witout being checked-in" });
      return;
    }

    if (lastActivity && (lastActivity.type == ActivityTypeEnum.CheckIn)) {
      const activityDate = new Date(lastActivity.createdAt);
    }


    await createActivity({
      type: ActivityTypeEnum.CheckOut,
      employee_id: employee.get("id"),
      createdAt: new Date(),
    });

      await interaction.reply(`${employee.last_name} ${employee.first_name} has just checked out temporarily!`);


  }
}
