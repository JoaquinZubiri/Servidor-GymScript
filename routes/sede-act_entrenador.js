import { Router } from "express";
import { sedeActEntrenadorController } from "../controllers/sede-act_entrenadores.js";

export const sedeActEntrenadorRouter = Router();

sedeActEntrenadorRouter.get("/", sedeActEntrenadorController.getAll);

sedeActEntrenadorRouter.get("/:id", sedeActEntrenadorController.getById);

sedeActEntrenadorRouter.post("/", sedeActEntrenadorController.create);

sedeActEntrenadorRouter.patch("/:id", sedeActEntrenadorController.update);

sedeActEntrenadorRouter.delete("/:id", sedeActEntrenadorController.delete);
