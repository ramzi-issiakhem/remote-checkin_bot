import { config } from "../config"
import  Activity  from "./models/Activity";
import  Company  from "./models/Company";
import Employee  from "./models/Employee";


const isDev = config.APP_ENV != "dev";


const initDB = () => {
    console.log("Syncronizing the Database");

    Activity.belongsTo(Employee,{foreignKey: "employee_id", as: "employee"});
    Employee.belongsTo(Company,{foreignKey: "company_id",as: "company"});

    Activity.sync({force: isDev});
    Employee.sync({force: isDev});
    Company.sync({force: isDev});

}

export default initDB;
