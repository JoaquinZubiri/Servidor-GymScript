import { Sequelize } from "sequelize";

const db = new Sequelize("gimnasio", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
