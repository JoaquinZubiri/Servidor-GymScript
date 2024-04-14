import z from 'zod'

const planActividadSchema = z.object({
  idPlan: z.number(),
  idActividad: z.number()
})

export function validatePlanActividad(object) {
  return planActividadSchema.safeParse(object)
}

export function validateParcialPlanActividad(object) {
  return planActividadSchema.partial().safeParse(object)
}
