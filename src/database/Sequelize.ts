import { Sequelize } from "sequelize";
import { Employees } from "./models/Employees";
import { Activities } from "./models/Activities";
import { Companies } from "./models/Companies";


export const sequelizeInstance = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite'
});







const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelizeInstance.sync({force}).then(async () => {
	console.log("Database synced");
}).catch(console.error)