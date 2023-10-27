import { Router } from "express";
import { inscripcionController } from "../controllers/inscripciones.js";

export const inscripcionRouter = Router();

/*URLS para consulta de atributos en GETALL
http://localhost:1234/inscripciones?idUsuario=1
http://localhost:1234/inscripciones?idPlan=1
http://localhost:1234/inscripciones?idSede=1
http://localhost:1234/inscripciones?idUsuario=1&fechaBaja=null
http://localhost:1234/inscripciones?fechaBaja=null
*/
inscripcionRouter.get("/", inscripcionController.getAll);

inscripcionRouter.get("/:id", inscripcionController.getById);

inscripcionRouter.post("/", inscripcionController.create);

inscripcionRouter.patch("/:id", inscripcionController.update);

inscripcionRouter.delete("/:id", inscripcionController.delete);
