import z from "zod";

const ActividadSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
});

export function validateActividad(object) {
  return ActividadSchema.safeParse(object);
}

export function validateParcialActividad(object) {
  return ActividadSchema.partial().safeParse(object);
}
