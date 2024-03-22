import { Router } from 'express';
import { productoController } from '../controllers/productos.js';
import { authAdmin } from '../middleware/auth.js';
import { imgUpload } from '../middleware/imgStorage.js';

export const productoRouter = Router();

//url/producto?ord=ASC --> Ordenar de forma ascendente
//url/producto?ord=DESC --> Ordenar de forma descendente
productoRouter.get('/', productoController.getAll);

productoRouter.get('/:id', productoController.getById);

productoRouter.post(
  '/',
  authAdmin,
  imgUpload.single('file'),
  productoController.create
);

productoRouter.patch(
  '/:id',
  authAdmin,
  imgUpload.single('file'),
  productoController.update
);

productoRouter.delete('/:id', authAdmin, productoController.delete);
