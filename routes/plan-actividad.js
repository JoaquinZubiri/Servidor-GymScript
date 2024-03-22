import { Router } from 'express';
import { planActividadController } from '../controllers/plan-actividad.js';
import { authAdmin } from '../middleware/auth.js';

export const planActividadRouter = Router();

// url/plan-actividades?idPlan=1 --> Devuelve todas las actividades del plan con id 1
// url/plan-actividades?idActividad=1 --> Devuelve todos los planes que contienen la actividad con id 1
planActividadRouter.get('/', planActividadController.getAll);

planActividadRouter.get('/:id', planActividadController.getById);

planActividadRouter.post('/', authAdmin, planActividadController.create);

planActividadRouter.patch('/:id', authAdmin, planActividadController.update);

planActividadRouter.delete('/:id', authAdmin, planActividadController.delete);
