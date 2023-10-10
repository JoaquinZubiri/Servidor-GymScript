import z from "zod";

const productoSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  tipo: z.string(),
  img: z.string().optional(),
});

export function validateProducto(object) {
  return productoSchema.safeParse(object);
}

export function validateParcialProducto(object) {
  return productoSchema.partial().safeParse(object);
}
