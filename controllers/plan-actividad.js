import { planActividadModel } from "../models/plan-actividad.js";
import { actividadModel } from "../models/actividad.js";
import { planModel } from "../models/plan.js";

import {
  validatePlanActividad,
  validateParcialPlanActividad,
} from "../Schemas/plan-actividad.js";

export class planActividadController {
  static async getAll(req, res) {
    try {
      // Recibimos los parametros de la query
      const idPlan = req.query.idPlan;
      const idActividad = req.query.idActividad;
      // Llamamos a la funcion que arma la query segun los parametros recibidos
      const planActividades = await parametrosQueryGetAll(idPlan, idActividad);
      if (planActividades.length === 0) {
        res
          .status(404)
          .json({ msg: "No se encontraron planes asociados a una actividad" });
      } else {
        res.status(200).json(planActividades);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los planes asociados a una actividad",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const planActividad = await planActividadModel.findByPk(req.params.id, {
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
        ],
      });
      if (!planActividad) {
        res
          .status(404)
          .json({ msg: "Plan asociado a una actividad no encontrado" });
      } else {
        res.status(200).json(planActividad);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el plan asociado a una actividad",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validatePlanActividad(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error ingreso de datos",
          error: result.error.errors,
        });
      } else {
        await planActividadModel.create(result.data);
        res.status(201).json({ msg: "Asociacion plan con actividad creado" });
      }
    } catch (error) {
      //if para manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "El plan o actividad ingresado no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de asociar un plan a una actividad",
          error: error.message,
        });
      }
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialPlanActividad(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error ingreso de datos",
          error: result.error.errors,
        });
      } else {
        const planActividad = await planActividadModel.findByPk(req.params.id);
        if (!planActividad) {
          res.status(404).json({
            msg: "Asociacion del plan con la actividad no encontrada",
          });
        } else {
          await planActividad.update(result.data);
          res.status(200).json({
            msg: "Asociacion entre el plan y la actividad actualizada",
          });
        }
      }
    } catch (error) {
      //if para manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "El plan o actividad ingresado no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de actualizar la asociacion entre el plan y la actividad",
          error: error.message,
        });
      }
    }
  }

  static async delete(req, res) {
    try {
      const planActividad = await planActividadModel.findByPk(req.params.id);
      if (!planActividad) {
        res
          .status(404)
          .json({ msg: "Asociacion del plan con la actividad no encontrada" });
      } else {
        await planActividad.destroy();
        res
          .status(200)
          .json({ msg: "Asociacion plan con actividad eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la asociacion del plan con la actividad",
        error: error.message,
      });
    }
  }
}

async function parametrosQueryGetAll(idPlan, idActividad) {
  try {
    // funcion para armar la query segun los parametros recibidos
    let planActividades = [];
    if (idPlan) {
      // Todas las actividades de un plan
      planActividades = await planActividadModel.findAll({
        where: {
          idPlan: idPlan,
        },
        attributes: ["idActividad"],
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
        ],
      });
    } else if (idActividad) {
      // Todos los planes que contienen a la actividad
      planActividades = await planActividadModel.findAll({
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
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
        ],
      });
    } else {
      // Todas las actividades de todos los planes
      planActividades = await planActividadModel.findAll({
        include: [
          {
            model: actividadModel,
            as: "actividad",
            attributes: ["id", "nombre", "descripcion"],
          },
          {
            model: planModel,
            as: "plan",
            attributes: ["id", "nombre", "descripcion", "precioMensual"],
          },
        ],
      });
    }
    return planActividades;
  } catch (error) {
    return [];
  }
}
