import z from 'zod'

const checkInSchema = z.object({
  idUsuario: z.number(),
  idSede: z.number(),
  fecha: z.string(),
  hora: z.string()
})

export function validateCheckIn(object) {
  return checkInSchema.safeParse(object)
}

export function validateParcialCheckIn(object) {
  return checkInSchema.partial().safeParse(object)
}
