import { inscripcionModel } from "../models/inscripcion.js";
import { usuarioModel } from "../models/usuario.js";
import { planModel } from "../models/plan.js";
import { sedeModel } from "../models/sede.js";
import { cuotaModel } from "../models/cuota.js";
import { cuotaController } from "./cuotas.js";

import jwt from "jsonwebtoken";

import {
  validateInscripcion,
  validateParcialInscripcion,
  validateCreateInscripcion,
} from "../Schemas/inscripcion.js";
import e from "express";

// DEVOLVEMOS TODOS LOS ATRIBUTOS DE LAS RELACIONES CON INSCRIPCION

export class inscripcionController {
  static async getAll(req, res) {
    try {
      // Recuperamos los parametros de la query
      const idSede = req.query.idSede;
      const idPlan = req.query.idPlan;
      const fechaBaja = req.query.fechaBaja;
      const idUsuario = req.query.idUsuario;
      // Para llamar con la cuota
      const couta = req.query.cuota;
      // Llamamos a la funcion que arma la query segun los parametros
      const inscripciones = await parametrosQueryGetAll(
        idUsuario,
        idPlan,
        idSede,
        fechaBaja,
        couta
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
      const result = validateCreateInscripcion(req.body);
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
          //Creo fecha de alta de la inscripcion
          let fechaAlta = new Date();
          result.data.fechaAlta = fechaAlta.toISOString().split("T")[0];
          result.data.fechaBaja = null;
          const insc = await inscripcionModel.create(result.data);
          //Busco la inscripcion creada para sacar el id y el monto para crear la cuota
          const inscParametro = await inscripcionModel.findByPk(insc.id, {
            include: [
              {
                model: planModel,
                as: "plan",
                attributes: ["precioMensual"],
              },
            ],
          });
          //crear cuota
          const cuota = await cuotaController.instanciarCuota(inscParametro);
          if (!cuota) {
            res.status(500).json({
              msg: "Ocurrio un error a la hora de crear la cuota de la inscripcion",
            });
          } else {
            res
              .status(201)
              .json({ msg: "Inscripcion creada con su cuota paga" });
          }
        }
      }
    } catch (error) {
      //if para manejo de de error de cada FK
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
      //if para manejo de de error de cada FK
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
      if (
        error.message.includes(
          "Cannot delete or update a parent row: a foreign key constraint fails"
        )
      ) {
        res.status(400).json({
          error:
            "No se puede eliminar la inscripcion porque tiene cuotas asociadas",
        });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de eliminar la inscripcion",
          error: error.message,
        });
      }
    }
  }
}

function validarBodyUpdate(reqBody) {
  // Validamos que en el body solo venga la fecha de baja
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

async function parametrosQueryGetAll(
  idUsuario,
  idPlan,
  idSede,
  fechaBaja,
  cuota
) {
  try {
    // Validamos cuales fueron los parametros que se enviaron y armamos la query a la BD dependiendo de esto.
    let inscripciones = undefined;
    if (idUsuario && fechaBaja) {
      // Todas las inscripciones activas de un usuario con su ultima cuota
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
          {
            model: cuotaModel,
            as: "cuota",
            attributes: ["id", "fechaPago", "importe", "fechaVenc"],
            limit: 1,
            order: [["fechaPago", "DESC"]],
          },
        ],
      });
    } else if (fechaBaja) {
      // Todas las inscripciones activas
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
      // Todas las inscripciones de un usuario
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
      // Todas las inscripciones de un plan
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
      // Todas las inscripciones de una sede
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
    } else if (cuota) {
      //Devuelve todas las inscripciones con su ultima cuota
      //La cuota se encuentra en un array en posicion 0 (porque busca en un findAll)
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
          {
            model: cuotaModel,
            as: "cuota",
            attributes: ["id", "fechaPago", "importe", "fechaVenc"],
            limit: 1,
            order: [["fechaPago", "DESC"]],
          },
        ],
      });
    } else {
      // Todas las inscripciones
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
