import Company from "../models/Company";
import Employee from "../models/Employee";
import { EmployeeInput } from "../types";



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

export const getEmployeeCompany = async (employee: Employee): Promise<Company | null> => {

  const company = await Company.findOne({
    where: {
      "id": employee.company_id
    }
  });

  return company;
}
