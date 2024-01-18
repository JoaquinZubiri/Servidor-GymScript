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
import { coutaRouter } from './routes/cuota.js';
import { sedeActividadRouter } from './routes/sede-actividad.js';

import { validateToken } from './middleware/validate-token.js';
// import { configDotenv } from "dotenv";
import 'dotenv/config';
const port = process.env.PORT || 3000;

const app = express();
app.use(cors()); //Middleware para permitir el acceso a la API desde cualquier origen
app.use(json()); //Middleware para poder recuperar el body de la req en formato JSON
app.disable('x-powered-by'); // Middleware para ocultar información del servidor

// Agregamos las rutas

app.use('/productos', productoRouter);
app.use('/planes', planRouter);
app.use('/plan-actividades', planActividadRouter);
app.use('/usuarios', usuarioRouter);
app.use('/sede-actividades', sedeActividadRouter);
app.use('/', validateToken);
app.use('/provincias', provinciaRouter);
app.use('/localidades', localidadRouter);
app.use('/sedes', sedeRouter);
app.use('/inscripciones', inscripcionRouter);
app.use('/actividades', actividadRouter);
app.use('/cuotas', coutaRouter);

app.use((_, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
