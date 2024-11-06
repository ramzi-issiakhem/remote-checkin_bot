import { Activities } from "./models/Activities";
import { Companies } from "./models/Companies";
import { Employees } from "./models/Employees";
import { sequelizeInstance } from "./Sequelize";


    Employees.belongsTo(Companies,{foreignKey: "company_id", as: 'company'});

    Activities.belongsTo(Employees,{foreignKey: "employee_id", as: 'employee'})