import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../config";


 class Employee extends Model {
  public id!: number
  public user_id!: number
  public first_name!: string
  public last_name!: string
  public email!: string
  public company_id!: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}



Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   user_id: {
    type: DataTypes.STRING,
    unique: true
  },

  email: {
    type: DataTypes.TEXT,
    unique: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Employee;
