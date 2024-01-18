import { Router } from "express";
import { planController } from "../controllers/planes.js";
import { validateToken } from "../middleware/validate-token.js";

export const planRouter = Router();

planRouter.get("/", planController.getAll);

planRouter.get("/:id", planController.getById);

planRouter.post("/", validateToken, planController.create);

planRouter.patch("/:id", validateToken, planController.update);

planRouter.delete("/:id", validateToken, planController.delete);
