const z = require("zod"); //libreria para validar el body de la req

const movieSchema = z.object({
  title: z.string({
    required_error: "El titulo es requerido",
    invalid_type_error: "El titulo debe ser un string",
  }),
  year: z.number().int().min(1888).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url(),
  rate: z.number().min(0).max(10).default(0),
  genre: z.array(
    z.enum([
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Western",
      "Crime",
      "Sci-Fi",
    ])
  ),
});

function validateMovie(object) {
  //El safeParse devuelve un booleano para ver si es valido o no
  return movieSchema.safeParse(object);
}

function validateParcialMovie(object) {
  //El partial valida toma todos lo campos como opcional y valida los que viene en el objeto
  return movieSchema.partial().safeParse(object);
}

module.exports = { validateMovie, validateParcialMovie };
