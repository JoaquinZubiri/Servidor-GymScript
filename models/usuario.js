import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "gimnasio",
};

const connection = await mysql.createConnection(DEFAULT_CONFIG);

export class usuarioModel {
  static async getAll() {
    const result = await connection.query("SELECT * FROM usuario;");
    return result[0];
  }
}
