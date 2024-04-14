import { Router } from 'express'
import { planActividadController } from '../controllers/plan-actividad.js'
import { authAdmin } from '../middleware/auth.js'

export const planActividadRouter = Router()

planActividadRouter.get('/', planActividadController.getAll)

planActividadRouter.get('/:id', planActividadController.getById)

planActividadRouter.post('/', authAdmin, planActividadController.create)

planActividadRouter.patch('/:id', authAdmin, planActividadController.update)

planActividadRouter.delete('/:id', authAdmin, planActividadController.delete)
