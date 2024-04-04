import { Sequelize } from "sequelize";
// import { configDotenv } from "dotenv";
import "dotenv/config";

const db = new Sequelize(
  process.env.SCHEMADB,
  process.env.USERDB,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    dialect: "mysql",
    logging: false,
  }
);

export default db;
