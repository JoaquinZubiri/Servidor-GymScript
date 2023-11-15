import { Router } from "express";
import { cuotaController } from "../controllers/cuotas.js";

export const coutaRouter = Router();

coutaRouter.get("/", cuotaController.getAll);

coutaRouter.get("/:id", cuotaController.getById);

coutaRouter.post("/", cuotaController.pagar);

coutaRouter.delete("/:id", cuotaController.delete);
