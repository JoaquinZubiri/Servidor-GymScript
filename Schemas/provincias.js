import z from 'zod'

const provinciaSchema = z.object({
  nombre: z.string().min(1)
})

export function validateProvincia(object) {
  return provinciaSchema.safeParse(object)
}
