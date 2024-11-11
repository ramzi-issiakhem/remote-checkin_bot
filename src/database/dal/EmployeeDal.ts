import Employee from "../models/Employee";
import { EmployeeInput } from "../types";



export const createEmployee = async (payload: EmployeeInput): Promise<Employee> => {
  const employee = Employee.create(payload);
  return employee;
}

export const getEmployeeByUserId = async (userId: string): Promise<Employee|null> => {

  const employee =  await Employee.findOne({
    where: {
      "user_id": userId
    }
  });


  return employee;

}
