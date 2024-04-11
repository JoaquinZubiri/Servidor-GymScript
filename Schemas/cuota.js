import z from 'zod'

const cuotaSchema = z.object({
  idInscripcion: z.number(),
  fechaPago: z.string(),
  importe: z.number().positive(),
  fechaVenc: z.string()
})

export function validateCuota(object) {
  return cuotaSchema.safeParse(object)
}

export function validateParcialCuota(object) {
  return cuotaSchema
    .partial({ fechaPago: true, fechaVenc: true, importe: true })
    .safeParse(object)
}

export function validateCuotaUpdate(object) {
  return cuotaSchema.partial().safeParse(object)
}
