import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { usuarioModel } from "../models/usuario.js";
import {
  validateUsuario,
  validateParcialUsuario,
} from "../Schemas/usuarios.js";

export class usuarioController {
  static async getAll(req, res) {
    const mail = req.query.mail;
    //Si viene el mail como query param, se busca por mail
    if (mail) {
      try {
        const usuario = await usuarioModel.findOne({ where: { mail } });
        res.json(usuario);
      } catch (error) {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de obtener el usuario",
          error: error.message,
        });
      }
    }
    try {
      const usuario = await usuarioModel.findAll();
      res.json(usuario);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los usuarios",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const usuario = await usuarioModel.findByPk(req.params.id);
      if (!usuario) {
        res.status(404).json({ msg: "No existe el usuario" });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el usuario",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    if (!req.body.rol) {
      req.body.rol = "user";
    }
    const result = validateUsuario(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    result.data.contraseña = await bcrypt.hash(result.data.contraseña, 10);

    try {
      const usuario = await usuarioModel.findOne({
        where: { mail: result.data.mail },
      });
      if (usuario) {
        res.status(400).json({ msg: "El mail ya esta registrado" });
      } else {
        const newUsuario = await usuarioModel.create(result.data);
        res.statusCode = 201;
        res.json(newUsuario);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear el usuario",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    const result = validateParcialUsuario(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    try {
      const usuario = await usuarioModel.update(result.data, {
        where: { id: req.params.id },
      });
      res.json({
        msg: "Usuario actualizado",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar el usuario",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const usuario = await usuarioModel.findByPk(req.params.id);
      if (!usuario) {
        res.status(404).json({ msg: "No existe el usuario" });
      }
      await usuario.destroy();
      res.json({ msg: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el usuario",
        error: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    const result = validateParcialUsuario(req.body);
    const { mail, contraseña } = result.data;
    try {
      const usuario = await usuarioModel.findOne({ where: { mail } });
      if (!usuario) {
        res
          .status(400)
          .json({ msg: "El mail o la contraseña no son correctos" });
      } else {
        const match = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!match) {
          res
            .status(400)
            .json({ msg: "El mail o la contraseña no son correctos" });
        } else {
          const token = jwt.sign(
            {
              mail: usuario.mail,
            },
            process.env.SECRET_KEY || "passwordJWT",
            { expiresIn: "1h" }
          );
          res.json(token);
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de loguear el usuario",
        error: error.message,
      });
    }
  }
}
