import { Router } from "express";
import { planController } from "../controllers/planes.js";

export const planRouter = Router();

planRouter.get("/", planController.getAll);

planRouter.get("/:id", planController.getById);

planRouter.post("/", planController.create);

planRouter.patch("/:id", planController.update);

planRouter.delete("/:id", planController.delete);
