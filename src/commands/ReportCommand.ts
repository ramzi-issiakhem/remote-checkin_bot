import { Command } from './BaseCommand';
import { getAllActivitiesAfterCertainDate, getAllActivitiesByEmployeeId } from '../database/dal/ActivityDal';
import { getEmployeeByUserId } from '../database/dal/EmployeeDal';
import { CacheType, CommandInteraction } from 'discord.js';
import Activity from '../database/models/Activity';
import internal from 'stream';
import { ActivityTypeEnum } from '../database/types';
import Employee from '../database/models/Employee';
import { roleName } from '../utils/constants';
import { doMemberHasRoleByName, grantAccessToManagmentCommand } from '../utils/helpers';



export class ReportCommand extends Command {

  constructor() {
    super({
      name: "report",
      description: 'Report all the employees working hours',
      options: [
        { "type": 'integer', name: "report-days", description: "Define the number of days that preceeds the command", required: true },
        { "type": 'string', name: "user-id", description: "Define the number user to have all its detailed report", required: false }
      ]
    })
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {


    if (!interaction.isChatInputCommand()) return;


    if (!grantAccessToManagmentCommand(interaction)) return ;


    const dateOption: number = interaction.options.get("report-days", true).value as number;
    const userId = interaction.options.get("user-id")?.value as string | undefined;

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - dateOption);


    let activities: any = null;
    if (!userId) {
      activities = await getAllActivitiesAfterCertainDate(today, interaction.guildId!);
    } else {
      activities = await this.getUserActivities(userId);
      if (activities == null) {
        await interaction.reply({ content: "User does not exist", ephemeral: true });
        return;
      }

    }


    if (Object.keys(activities).length == 0) {
      await interaction.reply({ content: "No activities has been found", ephemeral: true });
      return;
    };


    const groupedActivities = activities.reduce((acc: any, activity: Activity) => {
      const employeeId = activity.employee_id;
      if (!acc[employeeId]) {
        acc[employeeId] = [];
      }
      acc[employeeId].push({
        activity_type: activity.type,
        createdAt: activity.createdAt,
      });
      return acc;
    }, {} as Record<string, { activity_type: string; createdAt: Date }[]>);





    const employeeWorkingHours = Object.entries(groupedActivities).forEach(async ([employeeId, activites]: [string, Array<Activity>]) => {
      let totalHours = 0;

      for (let i = 0; i < activities.length - 1; i++) {
        const currentActivity: Activity = activities[i];
        const nextActivity: Activity = activities[i + 1];

        if (currentActivity.type == ActivityTypeEnum.CheckIn) {
          if (nextActivity.type === ActivityTypeEnum.CheckOut || nextActivity.type === ActivityTypeEnum.TempCheckOut) {
            const dateOne = new Date(currentActivity.createdAt);
            const dateTwo = new Date(nextActivity.createdAt);
            const workedHours = ((dateTwo.getTime() - dateOne.getTime()) / (1000 * 60 * 60));
            totalHours = totalHours + workedHours;
          }
        }
      }

      const employee = await Employee.findOne({
        where: {
          "id": employeeId,
        }
      });
      await interaction.reply({ content: 'The employee ' + employee?.last_name + ' ' + employee?.first_name + ' has worked ' + totalHours.toFixed(1) + " Hours", ephemeral: true });
    });


  }

  private getUserActivities = async ($userId: string) => {
    const employee = await getEmployeeByUserId($userId);
    if (!employee) return null;
    return await getAllActivitiesByEmployeeId(employee.id);
  }
}
