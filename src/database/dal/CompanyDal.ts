import Company from "../models/Company";
import { CompanyInput} from "../types";



export const createUniqueCompany = async (payload: CompanyInput): Promise<Company|null> => {
  
  const existingCompany = await getCompanyByName(payload?.name);
  if (existingCompany != null) {
    return null;
  }

  const company = await Company.create(payload);
  return company;
}


export const getCompanyByName = async (companyName: string) => {
  const company = await Company.findOne({
    where: { "name": companyName },
  });

  return company;
}


//
// export const getAllActivitiesAfterCertainDate = async (date: Date) => {
//   const activities = Activity.findAll({
//     where: {
//       "createdAt": {
//         [Op.gte]: date
//       }
//     },
//   });
//
//   return activities;
// }
//
// export const getAllActivitiesByEmployeeId = async (employeeId: number, created_at?: Date): Promise<ActivityOutput[]> => {
//
//   const activities = await Activity.findAll({
//     where: {
//       "employee_id": employeeId,
//       ...(created_at && {
//         "createdAt": {
//           [Op.gte]: created_at
//         }
//       })
//     }
//   });
//
//
//   return activities;
//
// }
