import { Sequelize } from "sequelize";

export const sequelizeConnection = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: console.log,
  storage: 'database.sqlite'
});



