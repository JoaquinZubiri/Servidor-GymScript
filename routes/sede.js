import { Router } from 'express';
import { sedeController } from '../controllers/sedes.js';
import { authAdmin } from '../middleware/auth.js';

export const sedeRouter = Router();

sedeRouter.get('/', sedeController.getAll);

sedeRouter.get('/:id', sedeController.getById);

sedeRouter.post('/', authAdmin, sedeController.create);

sedeRouter.patch('/:id', authAdmin, sedeController.update);

sedeRouter.delete('/:id', authAdmin, sedeController.delete);
