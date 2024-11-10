import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import Activity from '../database/models/Activity';
import { ActivityTypeEnum } from '../database/types';
import { getEmployeeByUserId } from '../database/dal/EmployeeDal';



export class CheckInCommand extends Command {

  constructor() {
    super({
      name: "check-in",
      description: 'Register your checkin in the sytem, please first register with /remote-register!'
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


      await Activity.create({
      type: ActivityTypeEnum.CheckIn,
      employee_id: employee.get("id"),
    });
    await interaction.reply({ content: 'Pong' });
  }
}
