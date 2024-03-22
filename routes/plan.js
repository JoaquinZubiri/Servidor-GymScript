import { Router } from 'express';
import { planController } from '../controllers/planes.js';
import { authAdmin } from '../middleware/auth.js';

export const planRouter = Router();

planRouter.get('/', planController.getAll);

planRouter.get('/:id', planController.getById);

planRouter.post('/', authAdmin, planController.create);

planRouter.patch('/:id', authAdmin, planController.update);

planRouter.delete('/:id', authAdmin, planController.delete);
