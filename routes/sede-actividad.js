import { Router } from 'express'
import { sedeActividadController } from '../controllers/sede-actividad.js'
import { authAdmin } from '../middleware/auth.js'

export const sedeActividadRouter = Router()

sedeActividadRouter.get('/', sedeActividadController.getAll)

sedeActividadRouter.get('/:id', sedeActividadController.getById)

sedeActividadRouter.post('/', authAdmin, sedeActividadController.create)

sedeActividadRouter.patch('/:id', authAdmin, sedeActividadController.update)

sedeActividadRouter.delete('/:id', authAdmin, sedeActividadController.delete)
