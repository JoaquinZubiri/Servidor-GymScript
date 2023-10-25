import z from "zod";

const planesSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  precioMensual: z.number(),
});

export function validatePlanes(object) {
  return planesSchema.safeParse(object);
}

export function validateParcialPlanes(object) {
  return planesSchema.partial().safeParse(object);
}
