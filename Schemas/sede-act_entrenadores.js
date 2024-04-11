import z from 'zod'

const sedeActEntrenadoresSchema = z.object({
  idSedeAct: z.number(),
  idEntrenador: z.number()
})

export function validateSedeActEntrenadores(object) {
  return sedeActEntrenadoresSchema.safeParse(object)
}

export function validateParcialSedeActEntrenadores(object) {
  return sedeActEntrenadoresSchema.partial().safeParse(object)
}
