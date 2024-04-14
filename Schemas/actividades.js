import z from 'zod'

const ActividadSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().min(1)
})

export function validateActividad(object) {
  return ActividadSchema.safeParse(object)
}

export function validateParcialActividad(object) {
  return ActividadSchema.partial().safeParse(object)
}
