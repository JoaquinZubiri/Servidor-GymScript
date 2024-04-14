import { Router } from 'express'
import { cuotaController } from '../controllers/cuotas.js'
import { authAdmin, authUser } from '../middleware/auth.js'

export const cuotaRouter = Router()

cuotaRouter.get('/', authUser, cuotaController.getAll)

cuotaRouter.get('/:id', authAdmin, cuotaController.getById)

cuotaRouter.get('/vencimiento/:id', authUser, cuotaController.getStateCuota)

cuotaRouter.patch('/:id', authAdmin, cuotaController.update)

cuotaRouter.post('/', authUser, cuotaController.pagar)

cuotaRouter.post('/crear', authAdmin, cuotaController.create)

cuotaRouter.delete('/:id', authAdmin, cuotaController.delete)
