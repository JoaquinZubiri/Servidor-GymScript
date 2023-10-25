import { Router } from "express";
import { sedeController } from "../controllers/sedes.js";

export const sedeRouter = Router();

sedeRouter.get("/", sedeController.getAll);

sedeRouter.get("/:id", sedeController.getById);

sedeRouter.post("/", sedeController.create);

sedeRouter.patch("/:id", sedeController.update);

sedeRouter.delete("/:id", sedeController.delete);
