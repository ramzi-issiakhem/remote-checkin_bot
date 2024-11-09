import { Sequelize } from "sequelize";

export const sequelizeConnection = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite'
});



