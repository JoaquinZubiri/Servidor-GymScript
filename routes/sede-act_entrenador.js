import { Router } from "express";
import { SedeActEntrenadorController } from "../controllers/sede-act_entrenador";

export const sedeActEntrenadorRouter = Router();

sedeActEntrenadorRouter.get("/", SedeActEntrenadorController.getAll);

sedeActEntrenadorRouter.get("/:id", SedeActEntrenadorController.getById);

sedeActEntrenadorRouter.post("/", SedeActEntrenadorController.create);

sedeActEntrenadorRouter.patch("/:id", SedeActEntrenadorController.update);

sedeActEntrenadorRouter.delete("/:id", SedeActEntrenadorController.delete);

