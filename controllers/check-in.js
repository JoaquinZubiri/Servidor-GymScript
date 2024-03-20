import { checkInModel } from "../models/check-in.js";
import { usuarioModel } from "../models/usuario.js";
import { sedeModel } from "../models/sede.js";
import { inscripcionModel } from "../models/inscripcion.js";
import { cuotaModel } from "../models/cuota.js";

import {
  validateCheckIn,
  validateParcialCheckIn,
} from "../Schemas/check-in.js";

export class checkInController {
  static async getAll(req, res) {
    try {
      const checkIn = await checkInModel.findAll({
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "dni"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
      if (checkIn.length === 0) {
        res
          .status(404)
          .json({ msg: "No se encontraron check-ins registrados" });
      } else {
        res.json(checkIn);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los check-ins",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const checkIn = await checkInModel.findByPk(req.params.id, {
        include: [
          {
            model: usuarioModel,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "dni"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion"],
          },
        ],
      });
      if (!checkIn) {
        res.status(404).json({ error: "Check-in no encontrado" });
      } else {
        res.json(checkIn);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el check-in",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateCheckIn(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error en el ingreso de datos", error: result.error });
      } else {
        await checkInModel.create(checkIn);
        res.status(201).json({ msg: "Check-in creado con exito" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear el check-in",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialCheckIn(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error en el ingreso de datos", error: result.error });
      } else {
        const checkIn = await checkInModel.findByPk(req.params.id);
        if (!checkIn) {
          res.status(404).json({ error: "Check-in no encontrado" });
        } else {
          await checkIn.update(req.body);
          res.json({ msg: "Check-in actualizado con exito" });
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar el check-in",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const checkIn = await checkInModel.findByPk(req.params.id);
      if (!checkIn) {
        res.status(404).json({ error: "Check-in no encontrado" });
      } else {
        await checkIn.destroy();
        res.json({ msg: "Check-in eliminado con exito" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el check-in",
        error: error.message,
      });
    }
  }

  static async accessControl(req, res) {
    try {
      const dniUsuario = req.params.id;
      const usuario = await usuarioModel.findOne({
        where: { dni: dniUsuario },
      });
      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        const inscripcion = await inscripcionModel.findOne({
          where: { idUsuario: usuario.id, fechaBaja: null },
          include: [
            {
              model: sedeModel,
              as: "sede",
              attributes: ["id", "direccion", "idLocalidad"],
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
        if (!inscripcion) {
          res.status(404).json({ error: "No está inscripto" });
        } else {
          const estado = new Date(inscripcion.cuota.fechaVenc) < new Date();
          if (estado) {
            res.status(403).json({ error: "Cuota vencida" });
          } else {
            const checkIn = {
              idUsuario: usuario.id,
              idSede: inscripcion.sede.id,
              fecha: new Date().toISOString().split("T")[0],
              hora: new Date().toLocaleString().split(", ")[1],
            };
            await checkInModel.create(checkIn);
            res.status(201).json({
              estadoCuota: estado,
              usuario: usuario,
              inscripcion: inscripcion,
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de realizar el check-in",
        error: error.message,
      });
    }
  }
}
