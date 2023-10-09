import { usuarioModel } from "../models/usuario.js";
import {
  validateUsuario,
  validateParcialUsuario,
} from "../Schemas/usuarios.js";

export class usuarioController {
  static async getAll(req, res) {
    const usuario = await usuarioModel.getAll();
    res.json(usuario);
  }

  static async create(req, res) {
    const result = validateUsuario(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error.errors });
    }

    const newUsuario = await usuarioModel.create({ input: result.data });
    res.statusCode = 201;
    res.json(newUsuario);
  }

  static async loginUser(req, res) {}
}
