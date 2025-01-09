import { Sequelize } from "sequelize";
import { config } from "../config";


export const sequelizeConnection = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: config.DEBUG ? console.log : false,
  storage: 'database.sqlite'
});



