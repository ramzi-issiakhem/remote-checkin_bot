import Company from "../models/Company";
import Employee from "../models/Employee";
import { EmployeeInput, EmployeeStatusEnum } from "../types";
import { getLastActivityFromEmployeeId } from "./ActivityDal";
import { ActivityTypeEnum } from "../types";


export const createEmployee = async (payload: EmployeeInput): Promise<Employee> => {
  const employee = Employee.create(payload);
  return employee;
}

export const getEmployeeByUserId = async (userId: string): Promise<Employee | null> => {

  const employee = await Employee.findOne({
    where: {
      "user_id": userId
    }
  });
  return employee;
}



export interface EmployeeStatusData {
  employee: Employee,
  status: EmployeeStatusEnum
}
export const getEmployeesWithStatus = async (companyName?: string): Promise<Array<EmployeeStatusData>> => {

  let returnList: Array<EmployeeStatusData> = [];
  let employees: Array<Employee> = [];
  if (companyName) {
    const company = await Company.findOne({
      where: {
        "name": companyName
      }
    });

    if (company) {
      employees = await Employee.findAll({
        where: {
          "company_id": company.id
        }
      });
    }
  } else {
    employees = await Employee.findAll();
  }


  for (let i = 0; i < employees.length; i++) {

    const lastActivity = await getLastActivityFromEmployeeId(employees[i].id);

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

export const getEmployeeCompany = async (employee: Employee): Promise<Company | null> => {

  const company = await Company.findOne({
    where: {
      "id": employee.company_id
    }
  });

  return company;
}
