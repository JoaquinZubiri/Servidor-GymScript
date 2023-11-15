import { Router } from "express";
import { planActividadController } from "../controllers/plan-actividad.js";

export const planActividadRouter = Router();

// url/plan-actividades?idPlan=1 --> Devuelve todas las actividades del plan con id 1
// url/plan-actividades?idActividad=1 --> Devuelve todos los planes que contienen la actividad con id 1
planActividadRouter.get("/", planActividadController.getAll);

planActividadRouter.get("/:id", planActividadController.getById);

planActividadRouter.post("/", planActividadController.create);

planActividadRouter.patch("/:id", planActividadController.update);

planActividadRouter.delete("/:id", planActividadController.delete);
