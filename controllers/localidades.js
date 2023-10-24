import { localidadModel } from "../models/localidad.js";
import { provinciaModel } from "../models/provincia.js";
import {
  validateLocalidad,
  validateParcialLocalidad,
} from "../Schemas/localidades.js";

// VER SI HACE FALTA!! EN EL getAll Y getById DEVOLVER LA PROVINCIA CON EL JOIN (MAYOR COSTO DE PROCESAMIENTO)

export class localidadController {
  static async getAll(req, res) {
    try {
      //   const localidad = await localidadModel.findAll();
      const localidad = await localidadModel.findAll({
        include: {
          model: provinciaModel,
          as: "provincia",
          attributes: ["nombre"],
        },
      });
      res.json(localidad);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las localidades",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const localidad = await localidadModel.findByPk(id, {
        include: {
          model: provinciaModel,
          as: "provincia",
          attributes: ["nombre"],
        },
      });
      if (localidad) {
        res.json(localidad);
      } else {
        res.status(404).json({ error: "Localidad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la localidad",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateLocalidad(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      }
      const localidad = await localidadModel.create(result.data);
      res.status(201).json(localidad);
    } catch (error) {
      if (error.message.includes("foreign key constraint fails")) {
        res.status(400).json({ error: "La provincia no existe" });
      }
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear la localidad",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialLocalidad(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      }
      const localidad = await localidadModel.update(result.data, {
        where: { id: req.params.id },
      });
      res.json({
        msg: "Localidad actualizada",
      });
    } catch (error) {
      if (error.message.includes("foreign key constraint fails")) {
        res.status(400).json({ error: "La provincia no existe" });
      }
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar la localidad",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const localidad = await localidadModel.findByPk(req.params.id);
      if (!localidad) {
        res.status(404).json({ msg: "No existe la localidad" });
      }
      await localidad.destroy();
      res.json({ msg: "Localidad eliminada" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la localidad",
        error: error.message,
      });
    }
  }
}