import z from "zod";

const inscripcionSchema = z.object({
  idUsuario: z.number(),
  idPlan: z.number(),
  fechaAlta: z.date(),
  fechaBaja: z.date().nullable(),
  idSede: z.number(),
});

export function validateInscripcion(object) {
  return inscripcionSchema.safeParse(object);
}

export function validateParcialInscripcion(object) {
  return inscripcionSchema.partial().safeParse(object);
}

export function validateCreateInscripcion(object) {
  return inscripcionSchema
    .partial({ fechaBaja: true, fechaAlta: true })
    .safeParse(object);
}
