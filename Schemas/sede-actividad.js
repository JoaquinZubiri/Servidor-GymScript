import z from "zod";

const sedeActividadSchema = z.object({
  idSede: z.number(),
  idActividad: z.number(),
});

export function validateSedeActividad(object) {
  return sedeActividadSchema.safeParse(object);
}

export function validateParcialSedeActividad(object) {
  return sedeActividadSchema.partial().safeParse(object);
}
