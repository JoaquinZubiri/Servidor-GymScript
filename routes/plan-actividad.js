import { Router } from "express";
import { planActividadController } from "../controllers/plan-actividad.js";

export const planActividadRouter = Router();

// http://localhost:3001/plan-actividades?idPlan=1
// http://localhost:3001/plan-actividades?idActividad=1
planActividadRouter.get("/", planActividadController.getAll);

planActividadRouter.get("/:id", planActividadController.getById);

planActividadRouter.post("/", planActividadController.create);

planActividadRouter.patch("/:id", planActividadController.update);

planActividadRouter.delete("/:id", planActividadController.delete);
