import z from 'zod'; //libreria para validar el body de la req

const usuarioSchema = z.object({
  dni: z.number().int().positive().min(1).max(100000000),
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  telefono: z.number().int().positive().optional(),
  mail: z.string().min(1),
  contraseña: z.string().min(1),
  rol: z.enum(['admin', 'user']),
});

export function validateUsuario(object) {
  //El safeParse devuelve un booleano para ver si es valido o no
  return usuarioSchema.safeParse(object);
}

export function validateParcialUsuario(object) {
  //El partial valida toma todos lo campos como opcional y valida los que viene en el objeto
  return usuarioSchema.partial().safeParse(object);
}
