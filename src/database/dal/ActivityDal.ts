import { Op } from "sequelize";
import Activity from "../models/Activity";
import { ActivityInput, ActivityOutput, ActivityTypeEnum } from "../types";



export const createActivity = async (payload: ActivityInput): Promise<Activity> => {
  const activity = Activity.create(payload);
  return activity;
}


export const getLastActivityFromEmployeeId = async (employeeId: number, guildId: string) => {
  const lastActivity = await Activity.findOne({
    where: { "employee_id": employeeId, "guild_id": guildId },
    order: [["createdAt", 'DESC']]
  });

  return lastActivity;
}

export const getAllActivitiesAfterCertainDate = async (date: Date,guildId: string) => {
  const activities = Activity.findAll({
    where: {
      "guild_id": guildId,
      "createdAt": {
        [Op.gte]: date
      }
    },
  });

  return activities;
}

export const getAllActivitiesByEmployeeId = async (employeeId: number, created_at?: Date): Promise<ActivityOutput[]> => {

  const activities = await Activity.findAll({
    where: {
      "employee_id": employeeId,
      ...(created_at && {
        "createdAt": {
          [Op.gte]: created_at
        }
      })
    }
  });


  return activities;

}
