import z from 'zod'

const planesSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  precioMensual: z.number().positive()
})

export function validatePlanes(object) {
  return planesSchema.safeParse(object)
}

export function validateParcialPlanes(object) {
  return planesSchema.partial().safeParse(object)
}
