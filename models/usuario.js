import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

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

  static async create({ input }) {
    const hashedPassword = await bcrypt.hash(input.contraseña, 10);
    const result = await connection.query(
      "INSERT INTO usuario (dni, nombre, apellido, telefono, mail, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        input.dni,
        input.nombre,
        input.apellido,
        input.telefono,
        input.mail,
        hashedPassword,
        input.rol,
      ]
    );
    const [usuario] = await connection.query(
      "SELECT * FROM usuario WHERE id = ?;",
      [result[0].insertId]
    );
    return usuario[0];
  }
}
