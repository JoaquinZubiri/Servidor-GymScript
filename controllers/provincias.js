import { validateProvincia } from "../Schemas/provincias.js";
import { provinciaModel } from "../models/provincia.js";

export class provinciasController {
  static async getAll(req, res) {
    try {
      const provincias = await provinciaModel.findAll();
      res.json(provincias);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las provincias",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const provincia = await provinciaModel.findByPk(req.params.id);
      res.json(provincia);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la provincia",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    const result = validateProvincia(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    try {
      const provincia = await provinciaModel.create(result.data);
      res.json(provincia);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear la provincia",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    const result = validateProvincia(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    try {
      const provincia = await provinciaModel.update(result.data, {
        where: { id: req.params.id },
      });
      res.json({ msg: "Provincia actualizada" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar la provincia",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      //Ver como maneja sequelize el borrado en cascada
      const provincia = await provinciaModel.findByPk(req.params.id);
      await provincia.destroy();
      res.json({
        msg: "Provincia eliminada",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la provincia",
        error: error.message,
      });
    }
  }
}
