import { Router } from 'express';
import { sedeActEntrenadorController } from '../controllers/sede-act_entrenadores.js';
import { authAdmin } from '../middleware/auth.js';

export const sedeActEntrenadorRouter = Router();

sedeActEntrenadorRouter.get('/', sedeActEntrenadorController.getAll);

sedeActEntrenadorRouter.get('/:id', sedeActEntrenadorController.getById);

sedeActEntrenadorRouter.post(
  '/',
  authAdmin,
  sedeActEntrenadorController.create
);

sedeActEntrenadorRouter.patch(
  '/:id',
  authAdmin,
  sedeActEntrenadorController.update
);

sedeActEntrenadorRouter.delete(
  '/:id',
  authAdmin,
  sedeActEntrenadorController.delete
);
