import { Router } from 'express';
import { actividadController } from '../controllers/actividades.js';
import { authAdmin } from '../middleware/auth.js';

export const actividadRouter = Router();

//url/actividades?nombre=nombre --> entra a getAll y devuelve todas las actividades con ese nombre
actividadRouter.get('/', actividadController.getAll);

actividadRouter.get('/:id', actividadController.getById);

actividadRouter.post('/', authAdmin, actividadController.create);

actividadRouter.patch('/:id', authAdmin, actividadController.update);

actividadRouter.delete('/:id', authAdmin, actividadController.delete);
