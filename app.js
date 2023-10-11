import express, { json } from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuario.js";
import { productoRouter } from "./routes/producto.js";
// import "dotenv/config.js";

const app = express();
app.use(cors());
app.use(json()); //Middleware para poder recuperar el body de la req en formato JSON
app.disable("x-powered-by");
// dotenv.config();
const PORT = process.env.PORT ?? 1234;

app.use("/usuarios", usuarioRouter);
app.use("/productos", productoRouter);

app.use((_, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
