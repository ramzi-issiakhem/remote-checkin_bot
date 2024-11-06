import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../Sequelize";


export const Activities = sequelizeInstance.define('activities', {
    employee_id: DataTypes.STRING
});