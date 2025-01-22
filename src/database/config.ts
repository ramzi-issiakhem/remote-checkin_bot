import { Sequelize } from "sequelize";
import { config } from "../config";


let sequelize; // Declare variable outside if/else to make it accessible for export

if (config.DB_CONNECTION === 'mysql') {
  sequelize = new Sequelize(config.DB_DATABASE_NAME, config.DB_USER_NAME, config.DB_USER_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'mysql'
  });
} else {
  sequelize = new Sequelize({
    logging: config.DEBUG ? console.log : false,
    dialect: 'sqlite',
    storage: config.DB_STORAGE_FILE ?? "database.sqlite"
  });
}

export { sequelize as sequelizeConnection }; // Fixed export syntax

