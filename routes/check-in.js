import { Router } from 'express'
import { checkInController } from '../controllers/check-in.js'

export const checkInRouter = Router()

checkInRouter.get('/', checkInController.getAll)

checkInRouter.get('/:id', checkInController.getById)

checkInRouter.post('/', checkInController.create)

checkInRouter.patch('/:id', checkInController.update)

checkInRouter.delete('/:id', checkInController.delete)

checkInRouter.get('/accessControl/:id', checkInController.accessControl)
