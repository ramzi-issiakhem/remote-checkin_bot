import { DataTypes } from "sequelize";
import { sequelize } from "../Sequelize";


export const Activities = sequelize.define('activities', {
    company_id: DataTypes.INTEGER,
    employee_id: DataTypes.STRING
});