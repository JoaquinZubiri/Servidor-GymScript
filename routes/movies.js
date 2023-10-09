import { Router } from "express";
import { movieController } from "../controllers/movies.js";

export const moviesRouter = Router();

moviesRouter.get("/", movieController.getAll);

moviesRouter.get("/:id", movieController.getById);

moviesRouter.post("/", movieController.create);

moviesRouter.patch("/:id", movieController.update);

moviesRouter.delete("/:id", movieController.delete);
