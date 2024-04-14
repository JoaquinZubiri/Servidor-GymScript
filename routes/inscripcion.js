import { Router } from 'express'
import { inscripcionController } from '../controllers/inscripciones.js'
import { authUser } from '../middleware/auth.js'

export const inscripcionRouter = Router()

inscripcionRouter.get('/', authUser, inscripcionController.getAll)

inscripcionRouter.get('/:id', authUser, inscripcionController.getById)

inscripcionRouter.post('/', authUser, inscripcionController.create)

inscripcionRouter.patch('/:id', authUser, inscripcionController.update)

inscripcionRouter.delete('/:id', authUser, inscripcionController.delete)
