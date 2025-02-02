import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from './BaseCommand';
import { EmployeeStatusData, getEmployeesWithStatus } from '../database/dal/EmployeeDal';
import { EmployeeStatusEnum } from '../database/types';
import Employee from '../database/models/Employee';
import { grantAccessToManagmentCommand } from '../utils/helpers';



export class StatusCommand extends Command {

  constructor() {
    super({
      name: "status",
      description: 'Get the state of the employees',
      options: [
        { "type": "string", name: "company", description: "Define a specific company", required: false }
      ]
    })
  }

  formatDiscordResponse(groupedEmployees: Record<string, any[]>) {
    const checkinValue = EmployeeStatusEnum.CheckedIn;
    const checkoutValue = EmployeeStatusEnum.CheckedOut;
    const tempcheckoutValue = EmployeeStatusEnum.TempCheckedOut;

    // Use the values of checkinValue, checkoutValue, and tempcheckoutValue as keys
    const statusEmojis = {
      [checkinValue]: "🟢", // Checked-in emoji
      [checkoutValue]: "🔴", // Checked-out emoji
      [tempcheckoutValue]: "🕑", // Temp-checked-out emoji
    };

    let response = "**Employee Status Report**\n\n";
    for (const [status, employees] of Object.entries(groupedEmployees)) {
      const emoji = statusEmojis[status] || "❔"; // Default emoji for unknown statuses
      response += `**${emoji} ${status.toUpperCase()}**:\n`;
      employees.forEach((employee: Employee) => {
        response += `- ${employee.last_name}  ${employee.first_name}\n`;
      });
      response += "\n"; // Add a blank line between groups for readability
    }
    return response;
  };

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {

    if (!interaction.isChatInputCommand()) return;
    if (!grantAccessToManagmentCommand(interaction)) {
      await interaction.reply({ content: "You don't have access to run this command", ephemeral: true });
      return;
    }

    let employees: Array<EmployeeStatusData> = [];
    if (interaction.options.get("company")) {
      const company = interaction.options.get("company")?.value as string;
      employees = await getEmployeesWithStatus(interaction.guildId!, company);
    } else {
      employees = await getEmployeesWithStatus(interaction.guildId!);
    }

    if (employees.length == 0) {
      await interaction.reply({ content: "No employees found", ephemeral: true });
      return;
    }


    const groupedEmployees = employees.reduce((acc: any, employee) => {
      if (!acc[employee.status]) {
        acc[employee.status] = [];
      }
      acc[employee.status].push(employee.employee);
      return acc;
    }, {});

    await interaction.reply({ content: this.formatDiscordResponse(groupedEmployees), ephemeral: true });
  }
}

