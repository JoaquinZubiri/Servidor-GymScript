import { actividadModel } from "../models/actividad.js";
import {
  validateActividad,
  validateParcialActividad,
} from "../Schemas/actividades.js";

export class actividadController {
  static async getAll(req, res) {
    try {
      // Si viene el nombre como query param, se busca por nombre
      const nombre = req.query.nombre;
      if (nombre) {
        const actividad = await actividadModel.findOne({ where: { nombre } });
        if (!actividad) {
          res
            .status(404)
            .json({ error: "No se encontro actividad con ese nombre" });
        } else {
          res.json(actividad);
        }
      } else {
        // Si no viene el nombre, se buscan todas las actividades
        const actividad = await actividadModel.findAll();
        if (actividad.length === 0) {
          res.status(404).json({ error: "No se encontraron actividades" });
        } else {
          res.json(actividad);
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las actividades",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const actividad = await actividadModel.findByPk(req.params.id);
      if (!actividad) {
        res.status(404).json({ error: "No se encontro la actividad" });
      } else {
        res.json(actividad);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la actividad",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateActividad(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        await actividadModel.create(result.data);
        res.status(201).json({ msg: "Actividad creada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear la actividad",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialActividad(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        const actividad = await actividadModel.findByPk(req.params.id);
        if (!actividad) {
          res.status(404).json({ error: "No se encontro la actividad" });
        } else {
          await actividadModel.update(result.data, {
            where: { id: req.params.id },
          });
          res.status(201).json({ msg: "Actividad actualizada" });
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar la actividad",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const actividad = await actividadModel.findByPk(req.params.id);
      if (!actividad) {
        res.status(404).json({ error: "No se encontro la actividad" });
      } else {
        await actividad.destroy();
        res.status(200).json({ msg: "Actividad eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la actividad",
        error: error.message,
      });
    }
  }
}
