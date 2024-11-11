import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import Activity from '../database/models/Activity';
import { ActivityTypeEnum } from '../database/types';
import { getEmployeeByUserId } from '../database/dal/EmployeeDal';
import { createActivity } from '../database/dal/ActivityDal';



export class CheckInCommand extends Command {

  constructor() {
    super({
      name: "check-in",
      description: 'Register your checkin in the sytem, please first register with /remote-register!',
      options: [
        { "type": "string", name: "time", description: "Define the time you checked-in in case you forget to checked-in earlier", required: false }
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

    const today = new Date();

    const createdAtString = interaction.options.get('time')?.value == undefined ? "" : ""+interaction.options.get('time')?.value ;
    if (createdAtString.length > 2) {
      const [hours, minutes] = createdAtString.split(":").map(num => parseInt(num, 10));
      

      today.setHours(hours);
      today.setMinutes(minutes);
    };


    await createActivity({
      type: ActivityTypeEnum.CheckIn,
      employee_id: employee.get("id"),
      createdAt: today,
      updatedAt: today
    });

    if (createdAtString.length > 2) {
      await interaction.reply(`${employee.last_name} ${employee.first_name} forgot to check-in at ${createdAtString} !`);
    } else {
      await interaction.reply(`${employee.last_name} ${employee.first_name} has just checked in !`);
    }


  }
}
