import { localidadController } from '../controllers/localidades.js'
import { Router } from 'express'
import { authAdmin } from '../middleware/auth.js'

export const localidadRouter = Router()

localidadRouter.get('/', localidadController.getAll)

localidadRouter.get('/:id', localidadController.getById)

localidadRouter.post('/', authAdmin, localidadController.create)

localidadRouter.patch('/:id', authAdmin, localidadController.update)

localidadRouter.delete('/:id', authAdmin, localidadController.delete)
