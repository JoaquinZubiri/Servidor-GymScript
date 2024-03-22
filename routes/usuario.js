import { Router } from 'express';
import { usuarioController } from '../controllers/usuarios.js';
import { authAdmin, authUser, onOwnAccount } from '../middleware/auth.js';

export const usuarioRouter = Router();

usuarioRouter.post('/loginUser', usuarioController.loginUser);

// url/usuarios?mail=mail --> Devuelve el usuario con ese mail
usuarioRouter.get('/', authAdmin, usuarioController.getAll);

usuarioRouter.get('/:id', authUser, onOwnAccount, usuarioController.getById);

usuarioRouter.post('/', usuarioController.create);

usuarioRouter.patch('/:id', authUser, onOwnAccount, usuarioController.update);

usuarioRouter.delete('/:id', authUser, onOwnAccount, usuarioController.delete);
