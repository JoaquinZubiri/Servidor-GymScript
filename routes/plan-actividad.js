import { Router } from "express";
import { planActividadController } from "../controllers/plan-actividad.js";
import { validateToken } from "../middleware/validate-token.js";

export const planActividadRouter = Router();

// url/plan-actividades?idPlan=1 --> Devuelve todas las actividades del plan con id 1
// url/plan-actividades?idActividad=1 --> Devuelve todos los planes que contienen la actividad con id 1
planActividadRouter.get("/", planActividadController.getAll);

planActividadRouter.get("/:id", planActividadController.getById);

planActividadRouter.post("/", validateToken, planActividadController.create);

planActividadRouter.patch(
  "/:id",
  validateToken,
  planActividadController.update
);

planActividadRouter.delete(
  "/:id",
  validateToken,
  planActividadController.delete
);
