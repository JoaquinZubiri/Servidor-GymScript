import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { usuarioModel } from "../models/usuario.js";
import { inscripcionModel } from "../models/inscripcion.js";
import {
  validateUsuario,
  validateParcialUsuario,
} from "../Schemas/usuarios.js";
import db from "../db/connection.js";

export class usuarioController {
  static async getAll(req, res) {
    try {
      const mail = req.query.mail;
      //Si viene el mail como query param, se busca por mail
      if (mail) {
        const usuario = await usuarioModel.findOne({ where: { mail } });
        if (!usuario) {
          res.status(404).json({ msg: "No existe usuario con este mail" });
        } else {
          res.json(usuario);
        }
      } else {
        //Si no viene el mail como query param, se buscan todos los usuarios
        const usuario = await usuarioModel.findAll();
        if (usuario.length === 0) {
          res.status(404).json({ msg: "No existen usuarios" });
        } else {
          res.json(usuario);
        }
      }
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
      } else {
        res.json(usuario);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el usuario",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    //Si no viene el rol en el body, se asigna por defecto el rol user
    if (!req.body.rol) {
      req.body.rol = "user";
    }
    try {
      const result = validateUsuario(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        result.data.contraseña = await bcrypt.hash(result.data.contraseña, 10);
        const usuario = await usuarioModel.findOne({
          where: { mail: result.data.mail },
        });
        if (usuario) {
          res.status(400).json({ msg: "El mail ya esta registrado" });
        } else {
          const newUsuario = await usuarioModel.create(result.data);
          res.status(201).json(newUsuario);
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear el usuario",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialUsuario(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        const usuario = await usuarioModel.findByPk(req.params.id);
        if (!usuario) {
          res.status(404).json({ msg: "No existe el usuario a actualizar" });
        } else {
          if (result.data.contraseña) {
            result.data.contraseña = await bcrypt.hash(
              result.data.contraseña,
              10
            );
          }
          await usuarioModel.update(result.data, {
            where: { id: req.params.id },
          });
          res.json({ msg: "Usuario actualizado" }).status(200);
        }
      }
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
      } else {
        const t = await db.transaction();
        try {
          const inscripcion = await inscripcionModel.getOne({
            idUsuario: req.params.id,
          });
          if (inscripcion) {
            await inscripcionModel.update(
              { idUsuario: null, fechaBaja: new Date() },
              {
                where: { idUsuario: req.params.id },
              },
              { transaction: t }
            );
          }
          await usuario.destroy({ transaction: t });
          await t.commit();
          res.json({ msg: "Usuario eliminado" }).status(200);
        } catch (error) {
          await t.rollback();
          res.status(500).json({
            msg: "Ocurrio un error a la hora de eliminar el usuario",
            error: error.message,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el usuario",
        error: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const result = validateParcialUsuario(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        // Obtenemos el mail y la contraseña del body
        const { mail, contraseña } = result.data;
        const usuario = await usuarioModel.findOne({ where: { mail } });
        if (!usuario) {
          res
            .status(400)
            .json({ msg: "El mail o la contraseña no son correctos" });
        } else {
          // Comparamos la contraseña ingresada con la contraseña encriptada
          const match = await bcrypt.compare(contraseña, usuario.contraseña);
          if (!match) {
            res
              .status(400)
              .json({ msg: "El mail o la contraseña no son correctos" });
          } else {
            // Creamos el token
            const token = jwt.sign(
              {
                mail: usuario.mail,
                id: usuario.id,
                rol: usuario.rol,
              },
              process.env.SECRET_KEY || "passwordJWT",
              { expiresIn: "1h" }
            );
            res.json(token);
          }
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
