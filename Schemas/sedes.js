import z from "zod";

const sedesSchema = z.object({
  direccion: z.string(),
  idLocalidad: z.number(),
});

export function validateSedes(object) {
  return sedesSchema.safeParse(object);
}

export function validateParcialSedes(object) {
  return sedesSchema.partial().safeParse(object);
}
