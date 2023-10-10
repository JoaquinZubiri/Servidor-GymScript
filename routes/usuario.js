import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.js";

export const usuarioRouter = Router();

usuarioRouter.get("/", usuarioController.getAll);

usuarioRouter.get("/:id", usuarioController.getById);

usuarioRouter.post("/", usuarioController.create);

usuarioRouter.post("/loginUser", usuarioController.loginUser);

usuarioRouter.patch("/:id", usuarioController.update);

usuarioRouter.delete("/:id", usuarioController.delete);
