import { Router } from "express";
import { actividadController } from "../controllers/actividades.js";

export const actividadRouter = Router();

//url/actividades?nombre=nombre --> entra a getAll y devuelve todas las actividades con ese nombre
actividadRouter.get("/", actividadController.getAll);

actividadRouter.get("/:id", actividadController.getById);

actividadRouter.post("/", actividadController.create);

actividadRouter.patch("/:id", actividadController.update);

actividadRouter.delete("/:id", actividadController.delete);
