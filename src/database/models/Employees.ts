import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../Sequelize";


export const Employees = sequelizeInstance.define('employees', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    company_id: DataTypes.INTEGER
});
  
  