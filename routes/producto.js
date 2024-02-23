import { Router } from 'express';
import { productoController } from '../controllers/productos.js';
import { validateToken } from '../middleware/validate-token.js';
import { imgUpload } from '../middleware/imgStorage.js';

export const productoRouter = Router();

//url/producto?ord=ASC --> Ordenar de forma ascendente
//url/producto?ord=DESC --> Ordenar de forma descendente
productoRouter.get('/', productoController.getAll);

productoRouter.get('/:id', productoController.getById);

productoRouter.post(
  '/',
  validateToken,
  imgUpload.single('file'),
  productoController.create
);

productoRouter.patch('/:id', validateToken, productoController.update);

productoRouter.delete('/:id', validateToken, productoController.delete);
