import { movieModel } from "../models/MySQL/movie.js";
import { validateMovie, validateParcialMovie } from "../Schemas/movies.js";

export class movieController {
  //MANEJAR ERRORES CON UN MIDLEWARE try catch
  //Si hay asyc await hay que manejar los errores
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await movieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await movieModel.getById({ id });
    if (movie) return res.json(movie);
    else return res.status(404).json({ Mensaje: "No se encontro la pelicula" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error.errors });
    }

    const newMovie = await movieModel.create({ input: result.data });
    // const pelicula = await movieModel.getById({ id: newMovie.insertId });
    res.statusCode = 201;
    res.json(newMovie);
  }

  static async update(req, res) {
    const result = validateParcialMovie(req.body);
    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.errors) });
    }

    const { id } = req.params;
    const updatedMovie = await movieModel.update({ id, input: result.data });
    if (updatedMovie === false)
      return res.status(404).json({ Mensaje: "No se encontro la pelicula" });

    return res.json(updatedMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await movieModel.delete({ id });
    if (result === false)
      return res.status(404).json({ Mensaje: "No se encontro la pelicula" });

    return res.json({ Mensaje: "Pelicula eliminada" });
  }
}
