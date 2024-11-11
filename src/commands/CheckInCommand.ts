import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import Activity from '../database/models/Activity';
import { ActivityTypeEnum } from '../database/types';
import { getEmployeeByUserId } from '../database/dal/EmployeeDal';
import { createActivity, getLastActivityFromEmployeeId } from '../database/dal/ActivityDal';
import { isStringValidTime } from '../utils/helpers';



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
    const employee = await getEmployeeByUserId(interaction.user.id);
    if (!employee) {
      await interaction.user.send("You need first to register yourself as an employee by executing /remote-register");
      await interaction.reply({
        content: "You need first to register yourself as an employee by executing /remote-register",
        ephemeral: true
      });

      return;
    };




    //Verify if the user is not aleready checked in 
    const activeActivity = await getLastActivityFromEmployeeId(employee.id);
    if (activeActivity != null && activeActivity.type == ActivityTypeEnum.CheckIn) {
      await interaction.reply({ content: 'You are already checked in, please checkout before checking again !', ephemeral: true });
      await interaction.user.send('You are already checked in, please checkout before checking again !');
      return;
    }



    const today = new Date();
    const createdAtString = interaction.options.get('time')?.value as string | undefined ;
    if (createdAtString) {

      // Verify if date string is valid
      if (!isStringValidTime(createdAtString)) {
        await interaction.reply({"content": "The 'time' format is incorrect, please write in a HH:mm format. Ex: 18:00",ephemeral:true});
        await interaction.user.send("The 'time' format is incorrect, please write in a HH:mm format. Ex: 18:00");
      
        return;
      }

      const [hours, minutes] = createdAtString.split(":").map(num => parseInt(num, 10));


      today.setHours(hours);
      today.setMinutes(minutes);
    };


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
