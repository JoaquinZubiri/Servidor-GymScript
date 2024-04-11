import z from 'zod'

const entrenadorSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  telefono: z.number().int().positive()
})

export function validateEntrenador(object) {
  return entrenadorSchema.safeParse(object)
}

export function validateParcialEntrenador(object) {
  return entrenadorSchema.partial().safeParse(object)
}
