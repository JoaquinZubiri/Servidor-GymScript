import { Router } from 'express'
import { provinciasController } from '../controllers/provincias.js'

export const provinciaRouter = Router()

provinciaRouter.get('/', provinciasController.getAll)

provinciaRouter.get('/:id', provinciasController.getById)

provinciaRouter.post('/', provinciasController.create)

provinciaRouter.patch('/:id', provinciasController.update)

provinciaRouter.delete('/:id', provinciasController.delete)
