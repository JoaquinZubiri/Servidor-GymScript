import { Router } from "express";
import { productoController } from "../controllers/productos.js";

export const productoRouter = Router();

productoRouter.get("/", productoController.getAll);

// productoRouter.get("/:id", productoController.getById);

// productoRouter.post("/", productoController.create);

// productoRouter.patch("/:id", productoController.update);

// productoRouter.delete("/:id", productoController.delete);
