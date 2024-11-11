import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../config";
import { ActivityAttributes, ActivityInput, ActivityTypeEnum } from "../types";
  




class Activity extends Model<ActivityAttributes,ActivityInput> {
  public id!: number
  public type!: ActivityTypeEnum
  public employee_id!: number


  
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}


Activity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM(...Object.values(ActivityTypeEnum)),
    allowNull: false
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
});

export default Activity;
