import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../config";


class Company extends Model {
  public id!: number
  public name!: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}



Company.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
});

export default Company;
