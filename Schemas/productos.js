import z from 'zod'

const productoSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  tipo: z.string().min(1)
})

export function validateProducto(object) {
  return productoSchema.safeParse(object)
}

export function validateParcialProducto(object) {
  return productoSchema.partial().safeParse(object)
}
