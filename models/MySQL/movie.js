import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "moviesDB",
};

const connection = await mysql.createConnection(config);

export class movieModel {
  static async getAll({ genre }) {
    if (genre) {
      const result = await connection.query(
        "SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie m JOIN movie_genero ON m.id = movie_genero.idMovie JOIN genero g ON movie_genero.idGenero = g.id where g.title = ?;",
        [genre]
      );
      return result[0];
    }
    const result = await connection.query(
      "SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(genero.title SEPARATOR ', ') AS generos FROM movie m JOIN movie_genero ON m.id = movie_genero.idMovie JOIN genero ON movie_genero.idGenero = genero.id GROUP BY m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate;"
    );
    //Tratar de que devuelva un array de generos en vez de una string
    return result[0];
  }

  static async getById({ id }) {
    const result = await connection.query(
      "SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(genero.title SEPARATOR ', ') AS generos FROM movie m JOIN movie_genero ON m.id = movie_genero.idMovie JOIN genero ON movie_genero.idGenero = genero.id WHERE m.id = ? GROUP BY m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate;",
      [id]
    );
    return result[0];
  }

  static async create({ input }) {
    const result = await connection.query(
      "INSERT INTO movie (title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?);",
      [
        input.title,
        input.year,
        input.director,
        input.duration,
        input.poster,
        input.rate,
      ]
    );
    const [movie] = await connection.query(
      "SELECT * FROM movie WHERE id = ?;",
      [result[0].insertId]
    );
    return movie[0];
  }

  static async delete({ id }) {
    const result = await connection.query("DELETE FROM movie WHERE id = ?;", [
      id,
    ]);
    if (result[0].affectedRows === 0) return false;
    return true;
  }

  static async update({ id, input }) {
    const result = await connection.query("UPDATE movie SET ? WHERE id = ?;", [
      input,
      id,
    ]);
    if (result[0].affectedRows === 0) return false;
    const [movie] = await connection.query(
      "SELECT * FROM movie WHERE id = ?;",
      [id]
    );
    return movie[0];
  }
}
