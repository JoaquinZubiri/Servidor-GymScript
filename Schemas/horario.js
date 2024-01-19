import z from "zod";

const horarioSchema = z.object({
  dia: z.enum([
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ]),
  horaDesde: z.string().min(1),
  horaHasta: z.string().min(1),
  idSedeAct: z.number().min(1),
});

export function validateHorario(object) {
  return horarioSchema.safeParse(object);
}

export function validateParcialHorario(object) {
  return horarioSchema.partial().safeParse(object);
}
