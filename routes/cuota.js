import { Router } from "express";
import { cuotaController } from "../controllers/cuotas.js";

export const coutaRouter = Router();

// url/cuotas?idInscripcion=1 --> Devuelve todas las cuotas de la inscripcion 1
// url/cuotas?ultima=true --> Devuelve la ultima cuota de cada inscripcion
// url/cuotas?idInscripcion=1&&ultima=true --> Devuelve la ultima cuota de la inscripcion 1
// url/cuotas?ultimas=true --> Devuelve las ultimas 2 cuotas de cada inscripcion
// url/cuotas --> Devuelve todas las cuotas
coutaRouter.get("/", cuotaController.getAll);

coutaRouter.get("/:id", cuotaController.getById);

coutaRouter.post("/", cuotaController.pagar);

coutaRouter.post("/crear", cuotaController.create);

coutaRouter.delete("/:id", cuotaController.delete);
