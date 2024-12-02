import { config } from "../config"
import  Activity  from "./models/Activity";
import  Company  from "./models/Company";
import Employee  from "./models/Employee";


const forcePurge = config.PURGE_AFTER_BOOT;


const initDB = () => {
    console.log("Syncronizing the Database");

    Activity.belongsTo(Employee,{foreignKey: "employee_id", as: "employee"});
    Employee.belongsTo(Company,{foreignKey: "company_id",as: "company"});

    Activity.sync({force: forcePurge});
    Employee.sync({force: forcePurge});
    Company.sync({force: forcePurge});

}

export default initDB;
