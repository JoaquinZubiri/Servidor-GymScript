import z from "zod";

const inscripcionSchema = z.object({
  idUsuario: z.number(),
  idPlan: z.number(),
  fechaAlta: z.string(),
  fechaBaja: z.string().nullable(),
  idSede: z.number(),
});

export function validateInscripcion(object) {
  return inscripcionSchema.safeParse(object);
}

export function validateParcialInscripcion(object) {
  return inscripcionSchema.partial().safeParse(object);
}
