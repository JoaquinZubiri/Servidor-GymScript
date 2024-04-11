import { Router } from 'express'
import { entrenadoresController } from '../controllers/entrenadores.js'
import { authAdmin } from '../middleware/auth.js'

export const entrenadorRouter = Router()

entrenadorRouter.get('/', entrenadoresController.getAll)

entrenadorRouter.get('/:id', entrenadoresController.getById)

entrenadorRouter.post('/', authAdmin, entrenadoresController.create)

entrenadorRouter.patch('/:id', authAdmin, entrenadoresController.update)

entrenadorRouter.delete('/:id', authAdmin, entrenadoresController.delete)
