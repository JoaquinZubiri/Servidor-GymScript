import { Router } from 'express';
import { cuotaController } from '../controllers/cuotas.js';
import { authAdmin, authUser } from '../middleware/auth.js';

export const cuotaRouter = Router();

// url/cuotas?idInscripcion=1 --> Devuelve todas las cuotas de la inscripcion 1
// url/cuotas?ultima=true --> Devuelve la ultima cuota de cada inscripcion
// url/cuotas?idInscripcion=1&&ultima=true --> Devuelve la ultima cuota de la inscripcion 1
// url/cuotas?ultimas=true --> Devuelve las ultimas 2 cuotas de cada inscripcion
// url/cuotas --> Devuelve todas las cuotas
cuotaRouter.get('/', authAdmin, cuotaController.getAll);

cuotaRouter.get('/:id', authAdmin, cuotaController.getById);

//Devuelve el estado de la cuota (true si esta vencida, false si no)
cuotaRouter.get('/vencimiento/:id', authUser, cuotaController.getStateCuota);

cuotaRouter.patch('/:id', authAdmin, cuotaController.update);

cuotaRouter.post('/', authUser, cuotaController.pagar);

cuotaRouter.post('/crear', authAdmin, cuotaController.create);

cuotaRouter.delete('/:id', authAdmin, cuotaController.delete);
