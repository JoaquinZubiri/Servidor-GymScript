import { Router } from "express";
import { actividadController } from "../controllers/actividades.js";

export const actividadRouter = Router();

//http://localhost:1234/actividades?nombre=nombre
actividadRouter.get("/", actividadController.getAll);

actividadRouter.get("/:id", actividadController.getById);

actividadRouter.post("/", actividadController.create);

actividadRouter.patch("/:id", actividadController.update);

actividadRouter.delete("/:id", actividadController.delete);
