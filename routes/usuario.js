import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.js";
import { validateToken } from "../middleware/validate-token.js";

export const usuarioRouter = Router();

usuarioRouter.post("/loginUser", usuarioController.loginUser);

// url/usuarios?mail=mail --> Devuelve el usuario con ese mail
usuarioRouter.get("/", validateToken, usuarioController.getAll);

usuarioRouter.get("/:id", validateToken, usuarioController.getById);

usuarioRouter.post("/", usuarioController.create);

usuarioRouter.patch("/:id", validateToken, usuarioController.update);

usuarioRouter.delete("/:id", validateToken, usuarioController.delete);
