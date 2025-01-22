import Company from "../models/Company";
import Employee from "../models/Employee";
import { EmployeeInput, EmployeeStatusEnum } from "../types";
import { getLastActivityFromEmployeeId } from "./ActivityDal";
import { ActivityTypeEnum } from "../types";


export const createEmployee = async (payload: EmployeeInput): Promise<Employee> => {
  const employee = Employee.create(payload);
  return employee;
}

export const getEmployeeByUserId = async (userId: string, guildId: string): Promise<Employee | null> => {

  const employee = await Employee.findOne({
    where: {
      "user_id": userId,
      "guild_id": guildId
    }
  });
  return employee;
}



export interface EmployeeStatusData {
  employee: Employee,
  status: EmployeeStatusEnum
}
export const getEmployeesWithStatus = async (guildId: string, companyName?: string): Promise<Array<EmployeeStatusData>> => {

  let returnList: Array<EmployeeStatusData> = [];
  let employees: Array<Employee> = [];
  if (companyName) {
    const company = await Company.findOne({
      where: {
        "name": companyName,
        "guild_id": guildId
      }
    });

    if (company) {
      employees = await Employee.findAll({
        where: {
          "company_id": company.id,
          "guild_id": guildId
        }
      });
    }
  } else {
    employees = await Employee.findAll({
      where: {
        "guild_id": guildId
      }
    });
  }


  for (let i = 0; i < employees.length; i++) {

    const lastActivity = await getLastActivityFromEmployeeId(employees[i].id, guildId);

    let status = EmployeeStatusEnum.NeverCheckedIn;
    if (lastActivity) {
      if (lastActivity.type == ActivityTypeEnum.CheckIn) {
        status = EmployeeStatusEnum.CheckedIn;
      } else if (lastActivity.type == ActivityTypeEnum.CheckOut) {
        status = EmployeeStatusEnum.CheckedOut;
      } else if (lastActivity.type == ActivityTypeEnum.TempCheckOut) {
        status = EmployeeStatusEnum.TempCheckedOut;
      }
    }

    returnList.push({
      employee: employees[i],
      status: status
    });

  }

  return returnList;
}

export const getEmployeeCompany = async (employee: Employee, guildId: string): Promise<Company | null> => {

  const company = await Company.findOne({
    where: {
      "id": employee.company_id,
      "guild_id": guildId
    }
  });

  return company;
}
