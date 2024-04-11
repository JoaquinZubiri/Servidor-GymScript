import { Router } from 'express'
import { horarioController } from '../controllers/horarios.js'
import { authAdmin } from '../middleware/auth.js'

export const horarioRouter = Router()

horarioRouter.get('/', horarioController.getAll)

horarioRouter.get('/:id', horarioController.getById)

horarioRouter.post('/', authAdmin, horarioController.create)

horarioRouter.patch('/:id', authAdmin, horarioController.update)

horarioRouter.delete('/:id', authAdmin, horarioController.delete)
