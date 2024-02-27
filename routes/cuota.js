import { Router } from "express";
import { cuotaController } from "../controllers/cuotas.js";

export const cuotaRouter = Router();

// url/cuotas?idInscripcion=1 --> Devuelve todas las cuotas de la inscripcion 1
// url/cuotas?ultima=true --> Devuelve la ultima cuota de cada inscripcion
// url/cuotas?idInscripcion=1&&ultima=true --> Devuelve la ultima cuota de la inscripcion 1
// url/cuotas?ultimas=true --> Devuelve las ultimas 2 cuotas de cada inscripcion
// url/cuotas --> Devuelve todas las cuotas
cuotaRouter.get("/", cuotaController.getAll);

cuotaRouter.get("/:id", cuotaController.getById);

cuotaRouter.get("/vencimiento/:id", cuotaController.getStateCuota);

cuotaRouter.patch("/:id", cuotaController.update);

cuotaRouter.post("/", cuotaController.pagar);

cuotaRouter.post("/crear", cuotaController.create);

cuotaRouter.delete("/:id", cuotaController.delete);
