import { inscripcionModel } from "../models/inscripcion.js";
import { usuarioModel } from "../models/usuario.js";
import { planModel } from "../models/plan.js";
import { sedeModel } from "../models/sede.js";
import jwt from "jsonwebtoken";

import {
  validateInscripcion,
  validateParcialInscripcion,
} from "../Schemas/inscripcion.js";

export class inscripcionController {
  static async getAll(req, res) {
    try {
      const idSede = req.query.idSede;
      const idPlan = req.query.idPlan;
      const fechaBaja = req.query.fechaBaja;
      const idUsuario = req.query.idUsuario;
      const inscripciones = await parametrosQueryGetAll(
        idUsuario,
        idPlan,
        idSede,
        fechaBaja
      );

      if (inscripciones.length === 0) {
        res.status(404).json({ msg: "No se encontraron inscripciones" });
      } else {
        res.status(200).json(inscripciones);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las inscripciones",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const inscripcion = await inscripcionModel.findByPk(req.params.id, {
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
      if (!inscripcion) {
        res.status(404).json({ msg: "Inscripcion no encontrada" });
      } else {
        res.status(200).json(inscripcion);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la sede",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      //probar recuperar el token del header y obtener el id del usuario logueado
      // const token = jwt.decode(req.headers.authorization.split(" ")[1]);
      // req.body.idUsuario = parseInt(token.id);
      const result = validateInscripcion(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error ingreso de datos",
          error: result.error.errors,
        });
      } else {
        //validar que si hay una inscripcion del usuario, la fecha de baja sea !=null
        const insc = await inscripcionModel.findOne({
          where: { idUsuario: result.data.idUsuario, fechaBaja: null },
        });
        if (insc != null) {
          res
            .status(400)
            .json({ error: "El usuario ya tiene una inscripcion activa" });
        } else {
          await inscripcionModel.create(result.data);
          res.status(201).json({ msg: "Inscripcion creada" });
        }
      }
    } catch (error) {
      //if o switch para manejo de de error de cada FK
      if (error.message.includes("FOREIGN KEY (`idUsuario`)")) {
        res.status(400).json({ error: "El usuario ingresado no existe" });
      } else if (error.message.includes("FOREIGN KEY (`idPlan`)")) {
        res.status(400).json({ error: "El plan ingresado no existe" });
      } else if (error.message.includes("FOREIGN KEY (`idSede`)")) {
        res.status(400).json({ error: "La sede ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de crear la inscripcion",
          error: error.message,
        });
      }
    }
  }

  static async update(req, res) {
    try {
      //validar que en body solo venga la fechaBaja
      if (validarBodyUpdate(req.body)) {
        const result = validateParcialInscripcion(req.body);
        if (result.error) {
          res.status(400).json({
            msg: "Error ingreso de datos",
            error: result.error.errors,
          });
        } else {
          const inscripcion = await inscripcionModel.findByPk(req.params.id);
          if (!inscripcion) {
            res.status(404).json({ error: "Inscripcion no encontrada" });
          } else {
            await inscripcionModel.update(result.data, {
              where: { id: req.params.id },
            });
            res.status(200).json({ msg: "Inscripcion actualizada" });
          }
        }
      } else {
        res
          .status(400)
          .json({ error: "Solo se puede modificar la fecha de baja" });
      }
    } catch (error) {
      if (error.message.includes("FOREIGN KEY (`idUsuario`)")) {
        res.status(400).json({ error: "El usuario ingresado no existe" });
      } else if (error.message.includes("FOREIGN KEY (`idPlan`)")) {
        res.status(400).json({ error: "El plan ingresado no existe" });
      } else if (error.message.includes("FOREIGN KEY (`idSede`)")) {
        res.status(400).json({ error: "La sede ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de modificar la inscripcion",
          error: error.message,
        });
      }
    }
  }

  static async delete(req, res) {
    try {
      const inscripcion = await inscripcionModel.findByPk(req.params.id);
      if (!inscripcion) {
        res.status(404).json({ error: "Inscripcion no encontrada" });
      } else {
        await inscripcion.destroy();
        res.status(200).json({ msg: "Inscripcion eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la inscripcion",
        error: error.message,
      });
    }
  }
}

function validarBodyUpdate(reqBody) {
  if (
    reqBody.idUsuario == undefined &&
    reqBody.idPlan == undefined &&
    reqBody.fechaAlta == undefined &&
    reqBody.idSede == undefined &&
    reqBody.fechaBaja != undefined
  ) {
    return true;
  } else {
    return false;
  }
}

async function parametrosQueryGetAll(idUsuario, idPlan, idSede, fechaBaja) {
  try {
    let inscripciones = undefined;
    if (idUsuario && fechaBaja) {
      inscripciones = await inscripcionModel.findAll({
        where: { idUsuario, fechaBaja: null },
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    } else if (fechaBaja) {
      inscripciones = await inscripcionModel.findAll({
        where: { fechaBaja: null },
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    } else if (idUsuario) {
      inscripciones = await inscripcionModel.findAll({
        where: { idUsuario },
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    } else if (idPlan) {
      inscripciones = await inscripcionModel.findAll({
        where: { idPlan },
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    } else if (idSede) {
      inscripciones = await inscripcionModel.findAll({
        where: { idSede },
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    } else {
      inscripciones = await inscripcionModel.findAll({
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "mail", "nombre", "apellido"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
    }
    return inscripciones;
  } catch (error) {
    return [];
  }
}
