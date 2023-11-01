import express, { json } from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuario.js";
import { productoRouter } from "./routes/producto.js";
import { provinciaRouter } from "./routes/provincia.js";
import { localidadRouter } from "./routes/localidad.js";
import { planRouter } from "./routes/plan.js";
import { sedeRouter } from "./routes/sede.js";
import { inscripcionRouter } from "./routes/inscripcion.js";
import { actividadRouter } from "./routes/actividad.js";
import { planActividadRouter } from "./routes/plan-actividad.js";
// import { configDotenv } from "dotenv"; 
import 'dotenv/config'


const app = express();
app.use(cors());
app.use(json()); //Middleware para poder recuperar el body de la req en formato JSON
app.disable("x-powered-by");

app.use("/usuarios", usuarioRouter);
app.use("/productos", productoRouter);
app.use("/provincias", provinciaRouter);
app.use("/localidades", localidadRouter);
app.use("/planes", planRouter);
app.use("/sedes", sedeRouter);
app.use("/inscripciones", inscripcionRouter);
app.use("/actividades", actividadRouter);
app.use("/plan-actividades", planActividadRouter);


app.use((_, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen("1234", () => {
  console.log("Servidor escuchando en https://servidordsw.onrender.com:");
});
