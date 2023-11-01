import { Sequelize } from "sequelize";

// const db = new Sequelize("gimnasio", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
// });

const db = new Sequelize("b84l754fxnnbzxvu6l1f","ushawjsnhhwqvgjr","b8Ha7fIJK0HYPk9A0j7C",{
    host: "b84l754fxnnbzxvu6l1f-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql",
});

export default db;
