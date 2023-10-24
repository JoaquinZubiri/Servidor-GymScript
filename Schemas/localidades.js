import z from "zod";

const localidadSchema = z.object({
  nombre: z.string(),
  codPostal: z.string(),
  idProvincia: z.number(),
});

export function validateLocalidad(object) {
  return localidadSchema.safeParse(object);
}

export function validateParcialLocalidad(object) {
  return localidadSchema.partial().safeParse(object);
}
