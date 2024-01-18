import { sedeActividadModel } from "../models/sede-actividad.js";
import { actividadModel } from "../models/actividad.js";
import { sedeModel } from "../models/sede.js";

import {
  validateSedeActividad,
  validateParcialSedeActividad,
} from "../Schemas/sede-actividad.js";

export class sedeActividadController {
  static async getAll(req, res) {
    try {
      // Recibimos los parametros de la query
      const idSede = req.query.idSede;
      const idActividad = req.query.idActividad;
      // Llamamos a la funcion que arma la query segun los parametros recibidos
      const sedeActividades = await parametrosQueryGetAll(idSede, idActividad);
      if (sedeActividades.length === 0) {
        res
          .status(404)
          .json({ msg: "No se encontraron sedes asociadas a una actividad" });
      } else {
        res.status(200).json(sedeActividades);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las sedes asociadas a una actividad",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const sedeActividad = await sedeActividadModel.findByPk(req.params.id, {
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion", "idLocalidad"],
          },
        ],
      });
      if (!sedeActividad) {
        res
          .status(404)
          .json({ msg: "Sede asociada a una actividad no encontrada" });
      } else {
        res.status(200).json(sedeActividad);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la sede asociada a una actividad",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateSedeActividad(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error en el ingreso de datos",
          error: result.error.message,
        });
      } else {
        await sedeActividadModel.create(result.data);
        res.status(201).json({ msg: "Asociacion sede con actividad creada" });
      }
    } catch (error) {
      //if de manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "La sede o actividad ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de crear la sede asociada a una actividad",
          error: error.message,
        });
      }
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialSedeActividad(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error en el ingreso de datos",
          error: result.error.message,
        });
      } else {
        const sedeActividad = await sedeActividadModel.findByPk(req.params.id);
        if (!sedeActividad) {
          res
            .status(404)
            .json({ msg: "Asociacion sede con actividad no encontrada" });
        } else {
          await sedeActividadModel.update(result.data, {
            where: { id: req.params.id },
          });
          res
            .status(200)
            .json({ msg: "Asociacion sede con actividad actualizada" });
        }
      }
    } catch (error) {
      //if de manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "La sede o actividad ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de actualizar la sede asociada a una actividad",
          error: error.message,
        });
      }
    }
  }

  static async delete(req, res) {
    try {
      const sedeActividad = await sedeActividadModel.findByPk(req.params.id);
      if (!sedeActividad) {
        res
          .status(404)
          .json({ msg: "Asociacion sede con actividad no encontrada" });
      } else {
        await sedeActividad.destroy();
        res
          .status(200)
          .json({ msg: "Asociacion sede con actividad eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la sede asociada a una actividad",
        error: error.message,
      });
    }
  }
}

async function parametrosQueryGetAll(idSede, idActividad) {
  try {
    // funcion para armar la query segun los parametros recibidos
    let sedeActividades = [];
    if (idSede) {
      // Todas las actividades de una sede
      sedeActividades = await sedeActividadModel.findAll({
        where: {
          idSede: idSede,
        },
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion", "idLocalidad"],
          },
        ],
      });
    } else if (idActividad) {
      // Todos las sedes que contienen a la actividad
      sedeActividades = await sedeActividadModel.findAll({
        where: {
          idActividad: idActividad,
        },
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion", "idLocalidad"],
          },
        ],
      });
    } else {
      // Todas las actividades de todos las sedes
      sedeActividades = await sedeActividadModel.findAll({
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: sedeModel,
            as: "sede",
            attributes: ["id", "direccion", "idLocalidad"],
          },
        ],
      });
    }
    return sedeActividades;
  } catch (error) {
    return [];
  }
}
