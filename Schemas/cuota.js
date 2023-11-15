import z from "zod";

const cuotaSchema = z.object({
  idInscripcion: z.number(),
  fechaPago: z.date(),
  importe: z.number().positive(),
  fechaVenc: z.date(),
});

export function validateCuota(object) {
  return cuotaSchema.safeParse(object);
}

//Validacion parcial para el metodo pagar(valida como minimo el id de la inscripcion)
export function validateParcialCuota(object) {
  return cuotaSchema
    .partial({ fechaPago: true, fechaVenc: true, importe: true })
    .safeParse(object);
}

/* 
EJEMPLOS DE DATES PERMITIDOS POR ZOD
// valid dates
console.log(dateSchema.safeParse("2023-01-10T00:00:00.000Z").success); // true
console.log(dateSchema.safeParse("2023-01-10").success); // true
console.log(dateSchema.safeParse("1/10/23").success); // true
console.log(dateSchema.safeParse(new Date("1/10/23")).success); // true

//invalid dates 
console.log(dateSchema.safeParse("2023-13-10").success); // false
console.log(dateSchema.safeParse("0000-00-00").success); // false
*/
