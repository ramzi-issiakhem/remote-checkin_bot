import { DataTypes } from "sequelize";
import { sequelize } from "../Sequelize";


export const Employees = sequelize.define('employees', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    company: DataTypes.STRING
});
  
  