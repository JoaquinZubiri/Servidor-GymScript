import { Router } from 'express';
import { inscripcionController } from '../controllers/inscripciones.js';
import { authUser } from '../middleware/auth.js';

export const inscripcionRouter = Router();

/*URLS para consulta de atributos en GETALL
url/inscripciones?idUsuario=1 --> Devuelve todas las inscripciones del usuario con id 1
url/inscripciones?idPlan=1 --> Devuelve todas las inscripciones del plan con id 1
url/inscripciones?idSede=1 --> Devuelve todas las inscripciones de la sede con id 1
url/inscripciones?idUsuario=1&fechaBaja=null --> Devuelve todas las inscripciones del usuario con id 1 que estan activas(fechaBaja=null)
url/inscripciones?fechaBaja=null --> Devuelve todas las inscripciones que estan activas(fechaBaja=null)
url/inscripciones?cuota=true --> Devuelve todas las inscripciones con su ultima cuota
*/
inscripcionRouter.get('/', authUser, inscripcionController.getAll);

inscripcionRouter.get('/:id', authUser, inscripcionController.getById);

inscripcionRouter.post('/', authUser, inscripcionController.create);

// Quizas se deberia validar tambien que el usuario sea el dueño de la inscripcion
inscripcionRouter.patch('/:id', authUser, inscripcionController.update);
// Quizas se deberia validar tambien que el usuario sea el dueño de la inscripcion
inscripcionRouter.delete('/:id', authUser, inscripcionController.delete);
