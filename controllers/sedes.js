import { sedeModel } from "../models/sede.js";
import { localidadModel } from "../models/localidad.js";
import { validateSedes, validateParcialSedes } from "../Schemas/sedes.js";

export class sedeController {
  static async getAll(req, res) {
    try {
    const idLocalidad = req.query.idLocalidad;
    if(idLocalidad){
      const sede = await sedeModel.findAll({where: { idLocalidad: idLocalidad }});
      if(sede.length === 0){
        res.status(404).json({ msg: "No se encontraron sedes vinculadas a esta localidad" });
      }else{
        res.json(sede);
        }
    }else{
      const sede = await sedeModel.findAll({
        include: {
          model: localidadModel,
          as: "localidad",
          attributes: ["nombre"],
        },
      });
      if (sede.length === 0) {
        res.status(404).json({ msg: "No se encontraron sedes" });
      } else {
        res.json(sede);
      }
    }  
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las sedes",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const sede = await sedeModel.findByPk(req.params.id, {
        include: {
          model: localidadModel,
          as: "localidad",
          attributes: ["nombre"],
        },
      });
      if (!sede) {
        res.status(404).json({ error: "Sede no encontrada" });
      } else {
        res.json(sede);
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
      const result = validateSedes(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        await sedeModel.create(result.data);
        res.status(201).json({ msg: "Sede creada" });
      }
    } catch (error) {
      if (error.message.includes("foreign key constraint fails")) {
        res.status(400).json({ error: "La localidad no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de crear la sede",
          error: error.message,
        });
      }
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialSedes(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      } else {
        const sede = await sedeModel.findByPk(req.params.id);
        if (!sede) {
          res.status(404).json({ error: "Sede no encontrada" });
        } else {
          await sede.update(result.data, { where: { id: req.params.id } });
          res.status(200).json({ msg: "Sede actualizada" });
        }
      }
    } catch (error) {
      if (error.message.includes("foreign key constraint fails")) {
        res.status(400).json({ error: "La localidad no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de actualizar la sede",
          error: error.message,
        });
      }
    }
  }

  static async delete(req, res) {
    try {
      const sede = await sedeModel.findByPk(req.params.id);
      if (!sede) {
        res.status(404).json({ error: "Sede no encontrada" });
      } else {
        await sede.destroy();
        res.status(200).json({ msg: "Sede eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la sede",
        error: error.message,
      });
    }
  }
}
