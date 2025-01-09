import { Activity, CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import { ActivityTypeEnum } from '../database/types';
import { createActivity, getLastActivityFromEmployeeId } from '../database/dal/ActivityDal';
import { handleTimeOption, isStringValidTime, verifyEmployeeLastActivityDifferent, verifyEmployeeRegisteredAndRetrieve } from '../utils/helpers';
import { log } from 'console';



export class CheckInCommand extends Command {

  constructor() {
    super({
      name: "check-in",
      description: 'Register your checkin in the sytem, please first register with /remote-register!',
      options: [
        { "type": "string", name: "time", description: "Define the time you checked-in in case you forget in format of HH:mm like 18:00", required: false }
      ]
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {


    if (!interaction.isChatInputCommand()) return;

    //Verify if the user is registered in a company
    const employee = await verifyEmployeeRegisteredAndRetrieve(interaction);
    if (!employee) return;

    //Verify if the user is not aleready checked in 
    const response = await verifyEmployeeLastActivityDifferent(interaction, employee.id, ActivityTypeEnum.CheckIn, 'You are already checked in, please checkout before checking again !');
    if (!response) return;

    const data = await handleTimeOption(interaction);
    if (!data) return
    const { today, createdAtString } = data;


    const lastActivity = await getLastActivityFromEmployeeId(employee.id);
    if (lastActivity && (lastActivity.type == ActivityTypeEnum.CheckOut || lastActivity.type == ActivityTypeEnum.TempCheckOut)) {
      const activityDate = new Date(lastActivity.createdAt);

      if (today.getTime() < activityDate.getTime()) {
        interaction.reply({ content: "You can't register a checkin before a registered checkout/temporary checkout",ephemeral: true });
        return;
      }
    }


    await createActivity({
      type: ActivityTypeEnum.CheckIn,
      employee_id: employee.get("id"),
      createdAt: today,
    });

    if (createdAtString) {
      await interaction.reply(`${employee.last_name} ${employee.first_name} forgot to check-in at ${createdAtString} !`);
    } else {
      await interaction.reply(`${employee.last_name} ${employee.first_name} has just checked in !`);
    }


  }
}
