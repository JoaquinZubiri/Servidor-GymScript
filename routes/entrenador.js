import { Router } from "express";
import { entrenadoresController } from "../controllers/entrenadores.js";

export const entrenadorRouter = Router();

entrenadorRouter.get("/", entrenadoresController.getAll);

entrenadorRouter.get("/:id", entrenadoresController.getById);

entrenadorRouter.post("/", entrenadoresController.create);

entrenadorRouter.patch("/:id", entrenadoresController.update);

entrenadorRouter.delete("/:id", entrenadoresController.delete);