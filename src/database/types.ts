import { Optional } from "sequelize";



//Define the Activity Model type
export interface ActivityAttributes {
    id: number,
    type: ActivityTypeEnum,
    employee_id: number
}
export interface ActivityInput extends Optional<ActivityAttributes, 'id' | 'type' | 'employee_id'> {}
export interface ActivityOutput extends Required<ActivityAttributes> {}




export enum ActivityTypeEnum {
  CheckIn = "check-in",
  CheckOut = "check-out",
  TempCheckOut = "temp-check-out"
}
