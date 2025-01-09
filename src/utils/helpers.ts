import {  CacheType, CommandInteraction, GuildMember, Interaction, messageLink, PermissionsBitField } from "discord.js";
import { getLastActivityFromEmployeeId } from "../database/dal/ActivityDal";
import { getEmployeeByUserId } from "../database/dal/EmployeeDal";
import { ActivityTypeEnum } from "../database/types";
import { roleName } from "./constants";


export const isStringValidTime = (time: string): boolean => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return regex.test(time);
}

export const verifyEmployeeRegisteredAndRetrieve = async (interaction: CommandInteraction<CacheType>) => {
  const employee = await getEmployeeByUserId(interaction.user.id);
  if (!employee) {
    await interaction.user.send("You need first to register yourself as an employee by executing /remote-register");
    await interaction.reply({
      content: "You need first to register yourself as an employee by executing /remote-register",
      ephemeral: true
    });
    
    return;
  };

  return employee;

}

export const verifyEmployeeLastActivityDifferent = async (interaction: CommandInteraction, employeeId: number, activity: ActivityTypeEnum, message: string) => {
  const activeActivity = await getLastActivityFromEmployeeId(employeeId);

  if (activeActivity != null) {
    if (activeActivity.type == activity) {
      await interaction.reply({ content: message, ephemeral: true });
      await interaction.user.send(message);

      return null;
    }
  } 1
  return true;
}

export const handleTimeOption = async (interaction: CommandInteraction): Promise<{ today: Date, createdAtString: string | undefined } | null> => {

  const today = new Date();
  const createdAtString = interaction.options.get('time')?.value as string | undefined;
  if (createdAtString) {

    // Verify if date string is valid
    if (!isStringValidTime(createdAtString)) {
      await interaction.reply({ "content": "The 'time' format is incorrect, please write in a HH:mm format. Ex: 18:00", ephemeral: true });
      await interaction.user.send("The 'time' format is incorrect, please write in a HH:mm format. Ex: 18:00");

      return null;
    }

    const [hours, minutes] = createdAtString.split(":").map(num => parseInt(num, 10));


    today.setHours(hours);
    today.setMinutes(minutes);

    if (today.getTime() >= (new Date()).getTime()) {

      await interaction.reply({ "content": "You cannot define a time that is in the future", ephemeral: true });
      await interaction.user.send("You cannot define a time that is in the future");
      return null;
    }
  };

  return { today: today, createdAtString: createdAtString };
}


export const doMemberHasRoleByName = (interaction: Interaction, name: string): boolean => {
  // Ensure interaction is a command interaction and the member is a GuildMember
  if (!interaction.isCommand() || !(interaction.member instanceof GuildMember)) {
    return false;
  }

  // Check if the member has the role by name
  return interaction.member.roles.cache.some(role => role.name === name);
};


export const grantAccessToManagmentCommand = (interaction: Interaction) => {

  if (!interaction.isCommand() || !(interaction.member instanceof GuildMember)) {
    return false;
  }

  const hasAccess = doMemberHasRoleByName(interaction, roleName) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);


  if (!hasAccess) {
    interaction.reply({ content: "You cannot execute this function, you do not have permissions ! ", ephemeral: true });
    return false;
  }

  return true;
}

