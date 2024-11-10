import Activity from "../models/Activity";
import { ActivityInput } from "../types";



export const create = async (payload: ActivityInput) {
      
      const activity = Activity.create(payload);

      return activity;
    
}
