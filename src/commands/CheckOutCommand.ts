import { Command } from './BaseCommand';
import Activity from '../database/models/Activity';
import { ActivityTypeEnum } from '../database/types';
import { getEmployeeByUserId } from '../database/dal/EmployeeDal';
import { createActivity, getLastActivityFromEmployeeId } from '../database/dal/ActivityDal';
import { handleTimeOption, isStringValidTime, verifyEmployeeLastActivityDifferent, verifyEmployeeRegistered, verifyEmployeeRegisteredAndRetrieve } from '../utils/helpers';
import { CacheType, CommandInteraction } from 'discord.js';



export class CheckOutCommand extends Command {

  constructor() {
    super({
      name: "check-out",
      description: 'Register your checkout in the sytem',
      options: [
        { "type": "string", name: "time", description: "Define the time you checked-out in case you forget in format of HH:mm like 18:00", required: false }
      ]
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {


    if (!interaction.isChatInputCommand()) return;

    //Verify if the user is registered in a company
    const employee = await verifyEmployeeRegisteredAndRetrieve(interaction);
    if (!employee) return




    //Verify if the user is not already checked out or checkout out temporarily
    const firstResponse = await verifyEmployeeLastActivityDifferent(interaction, employee?.id, ActivityTypeEnum.CheckOut, 'You are already checked out, please check-in first');
    const secondResponse = await verifyEmployeeLastActivityDifferent(interaction, employee?.id, ActivityTypeEnum.TempCheckOut, 'You are already checked out temporarily, you need to check-in again to be able to checkout');
    if (!firstResponse || !secondResponse) {
      return
    }

    const data = await handleTimeOption(interaction);
    if (!data) return
    const { today, createdAtString } = data;


    const lastActivity = await getLastActivityFromEmployeeId(employee.id);
    if (!lastActivity) {
      await interaction.reply({content: "You can't checkout witout being checked-in",ephemeral: true});
      return;
    }

    if (lastActivity && (lastActivity.type == ActivityTypeEnum.CheckIn)) {
      const activityDate = new Date(lastActivity.createdAt);

      if (today.getTime() < activityDate.getTime()) {
        interaction.reply({ content: "You can't register a checkout before a registered checkin",ephemeral: true });
        return;
      }
    }

    await createActivity({
      type: ActivityTypeEnum.CheckOut,
      employee_id: employee.get("id"),
      createdAt: today,
    });

    if (createdAtString) {
      await interaction.reply(`${employee.last_name} ${employee.first_name} forgot to check-out at ${createdAtString} !`);
    } else {
      await interaction.reply(`${employee.last_name} ${employee.first_name} has just checked out !`);
    }


  }
}
