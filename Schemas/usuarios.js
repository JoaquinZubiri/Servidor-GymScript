import z from "zod"; //libreria para validar el body de la req

const usuarioSchema = z.object({
  dni: z.number().int().positive().min(1).max(100000000),
  nombre: z.string(),
  apellido: z.string(),
  telefono: z.number().int().positive().optional(),
  mail: z.string(),
  contraseña: z.string(),
  rol: z.enum(["admin", "user", "recepcionista"]),
});

export function validateUsuario(object) {
  //El safeParse devuelve un booleano para ver si es valido o no
  return usuarioSchema.safeParse(object);
}

export function validateParcialUsuario(object) {
  //El partial valida toma todos lo campos como opcional y valida los que viene en el objeto
  return usuarioSchema.partial().safeParse(object);
}
