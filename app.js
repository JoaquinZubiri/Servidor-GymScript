import express, { json } from 'express';
import cors from 'cors';
import { usuarioRouter } from './routes/usuario.js';
import { productoRouter } from './routes/producto.js';
import { provinciaRouter } from './routes/provincia.js';
import { localidadRouter } from './routes/localidad.js';
import { planRouter } from './routes/plan.js';
import { sedeRouter } from './routes/sede.js';
import { inscripcionRouter } from './routes/inscripcion.js';
import { actividadRouter } from './routes/actividad.js';
import { planActividadRouter } from './routes/plan-actividad.js';
import { cuotaRouter } from './routes/cuota.js';
import { sedeActividadRouter } from './routes/sede-actividad.js';
import { horarioRouter } from './routes/horario.js';
import { entrenadorRouter } from './routes/entrenador.js';
import { sedeActEntrenadorRouter } from './routes/sede-act_entrenador.js';
import { checkInRouter } from './routes/check-in.js';

import { authAdmin } from './middleware/auth.js';
import 'dotenv/config';

const app = express();
app.use(cors()); //Middleware para permitir el acceso a la API desde cualquier origen
app.use(json()); //Middleware para poder recuperar el body de la req en formato JSON
app.disable('x-powered-by'); // Middleware para ocultar información del servidor

// Agregamos las rutas
app.use('/img', express.static('public'));

app.use('/productos', productoRouter);
app.use('/planes', planRouter);
app.use('/plan-actividades', planActividadRouter);
app.use('/usuarios', usuarioRouter);
app.use('/sede-actividades', sedeActividadRouter);
app.use('/entrenadores', entrenadorRouter);
app.use('/sede-act-entrenadores', sedeActEntrenadorRouter);
app.use('/horarios', horarioRouter);
app.use('/sedes', sedeRouter);
app.use('/inscripciones', inscripcionRouter);
app.use('/actividades', actividadRouter);
app.use('/cuotas', cuotaRouter);
app.use('/localidades', localidadRouter);
app.use('/', authAdmin);
app.use('/check-in', checkInRouter);
app.use('/provincias', provinciaRouter);

app.use((_, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

export default app;
