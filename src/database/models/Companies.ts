import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../Sequelize";


export const Companies = sequelizeInstance.define('companies', {
    name: DataTypes.STRING
});