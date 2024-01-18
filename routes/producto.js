import { Router } from "express";
import { productoController } from "../controllers/productos.js";
import { validateToken } from "../middleware/validate-token.js";

export const productoRouter = Router();

productoRouter.get("/", productoController.getAll);

productoRouter.get("/:id", productoController.getById);

productoRouter.post("/", validateToken, productoController.create);

productoRouter.patch("/:id", validateToken, productoController.update);

productoRouter.delete("/:id", validateToken, productoController.delete);
