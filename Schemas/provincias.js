import z from "zod";

const provinciaSchema = z.object({
  nombre: z.string(),
});

export function validateProvincia(object) {
  return provinciaSchema.safeParse(object);
}
