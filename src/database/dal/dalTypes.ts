import { ActivityTypeEnum } from "../types";


export interface GetAllActivityFilters {
  type: ActivityTypeEnum,
  employee_id?: number
  created_at: Date
}
