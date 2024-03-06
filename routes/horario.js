import { Router } from "express";
import { horarioController } from "../controllers/horarios.js";

export const horarioRouter = Router();

// url/horarios?idSedeAct=1 --> Devuelve todas los horarios de la actividad-sede con id 1
horarioRouter.get("/", horarioController.getAll);

horarioRouter.get("/:id", horarioController.getById);

horarioRouter.post("/", horarioController.create);

horarioRouter.post("/actividades-user", horarioController.getByActividadesUser);

horarioRouter.patch("/:id", horarioController.update);

horarioRouter.delete("/:id", horarioController.delete);
