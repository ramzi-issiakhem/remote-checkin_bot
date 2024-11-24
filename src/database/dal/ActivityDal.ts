import { Op } from "sequelize";
import Activity from "../models/Activity";
import { ActivityInput, ActivityOutput, ActivityTypeEnum } from "../types";



export const createActivity = async (payload: ActivityInput): Promise<Activity> => {
  const activity = Activity.create(payload);
  return activity;
}


export const getLastActivityFromEmployeeId = async (employeeId: number) => {
  const lastActivity = await Activity.findOne({
    where: { "employee_id": employeeId },
    order: [["createdAt", 'DESC']]
  });

  return lastActivity;
}

export const getAllActivitiesAfterCertainDate = async (date: Date) => {
  const activities = Activity.findAll({
    where: {
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
