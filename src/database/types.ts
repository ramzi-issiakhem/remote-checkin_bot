import { Optional } from "sequelize";



//Define the Activity Model type
export interface ActivityAttributes {
    id: number,
    type: ActivityTypeEnum,
    employee_id: number,
    createdAt?: Date,
    updatedAt?: Date,
}
export interface ActivityInput extends Optional<ActivityAttributes, 'id' | 'type' | 'employee_id'> {}
export interface ActivityOutput extends Required<ActivityAttributes> {}



//Define the Employee Model type
export interface EmployeeAttributes {
    id: number,
    user_id: string,
    first_name: string,
    last_name:string,
    email: string,
    company_id: number
}
export interface EmployeeInput extends Optional<EmployeeAttributes,'id'> {}
export interface EmployeeOutput extends Required<EmployeeAttributes> {}


export enum ActivityTypeEnum {
  CheckIn = "check-in",
  CheckOut = "check-out",
  TempCheckOut = "temp-check-out"
}



//Define the Company Model type
export interface CompanyAttributes {
    id: number,
    name: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
}
export interface CompanyInput extends Optional<CompanyAttributes, 'id' | 'name'> {}
export interface CompanyOutput extends Required<CompanyAttributes> {}


