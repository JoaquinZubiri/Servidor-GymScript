import { localidadController } from "../controllers/localidades.js";
import { Router } from "express";

export const localidadRouter = Router();

localidadRouter.get("/", localidadController.getAll);

localidadRouter.get("/:id", localidadController.getById);

localidadRouter.post("/", localidadController.create);

localidadRouter.patch("/:id", localidadController.update);

localidadRouter.delete("/:id", localidadController.delete);
