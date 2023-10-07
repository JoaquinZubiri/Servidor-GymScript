const express = require("express"); //require --> commonJS
const crypto = require("node:crypto"); //libreria de node para crear id unicos
const movies = require("./movies.json");
const { validateMovie, validateParcialMovie } = require("./Schemas/movies");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");
const PORT = process.env.PORT ?? 1234;

//------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({ Mensaje: "Hola Mundo" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    //el SOME reemplaza al INCLUDE a la hora de buscar en el json para que no sea case sensitive
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  // path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  if (movie) return res.json(movie);
  else return res.status(404).json({ Mensaje: "No se encontro la pelicula" });
});

//------------------------------------------------------------
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    res.status(400).json({ error: result.error.errors });
  }

  const newMovie = {
    id: crypto.randomUUID(), //genera un id unico
    ...result.data,
  };
  //Esto NO seria REST ya que estamos guardando el estado de la aplicacion en el servidor
  movies.push(newMovie);
  res.statusCode = 201;
  res.json(newMovie); //Devolver el recurso deseado para actualizar la cache del cliente porque devuelve con id(opcional)
});

//------------------------------------------------------------
app.patch("/movies/:id", (req, res) => {
  const result = validateParcialMovie(req.body);
  if (result.error) {
    res.status(400).json({ error: JSON.parse(result.error.errors) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1)
    return res.status(404).json({ Mensaje: "No se encontro la pelicula" });

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updatedMovie;
  return res.json(updatedMovie);
});

//------------------------------------------------------------

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1)
    return res.status(404).json({ Mensaje: "No se encontro la pelicula" });
  movies.splice(movieIndex, 1);

  return res.json({ Mensaje: "Pelicula eliminada" });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:1234");
});
