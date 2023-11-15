import { cuotaModel } from "../models/cuota.js";
import { inscripcionModel } from "../models/inscripcion.js";
import { planModel } from "../models/plan.js";

import { validateCuota, validateParcialCuota } from "../Schemas/cuota.js";

export class cuotaController {
  static async getAll(req, res) {
    //Obtener todas las cuotas
    //las cuotas de una inscripcion
    //todas las ultimas cuotas
    //la ultima cuota de una iscripcion
    try {
      const cuota = await cuotaModel.findAll({
        include: {
          model: inscripcionModel,
          as: "inscripcion",
          attributes: ["id", "idPlan", "idUsuario"],
        },
      });
      if (cuota.length === 0) {
        res.status(404).json({ msg: "No se encontraron cuotas registradas" });
      } else {
        res.json(cuota);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener las cuotas",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const cuota = await cuotaModel.findByPk(req.params.id, {
        include: {
          model: inscripcionModel,
          as: "inscripcion",
          attributes: ["id", "idPlan", "idUsuario"],
        },
      });
      if (!cuota) {
        res.status(404).json({ error: "Cuota no encontrada" });
      } else {
        res.json(cuota);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener la cuota",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateCuota(req.body);
      if (result.error) {
        res.status(400).json({ error: "Error ingreso de datos" });
      } else {
        const cuota = await cuotaModel.create(result.data);
        res.json(cuota).status(201);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear la cuota",
        error: error.message,
      });
    }
  }

  static async pagar(req, res) {
    try {
      const result = validateParcialCuota(req.body);
      if (result.error) {
        res.status(400).json({ error: "Error ingreso de datos" });
      } else {
        const insc = await inscripcionModel.findByPk(
          result.data.idInscripcion,
          {
            include: {
              model: planModel,
              as: "plan",
              attributes: ["precioMensual"],
            },
          }
        );
        if (!insc) {
          res.status(404).json({ error: "Inscripcion no encontrada" });
        } else {
          //Llamo a funcion que instancia la cuota
          const cuota = await cuotaController.instanciarCuota(insc);
          //Valido que no haya error
          if (!cuota) {
            res.status(500).json({
              msg: "Ocurrio un error a la hora de pagar la cuota",
            });
          } else {
            res.json({ msg: "Cuota pagada" }).status(201);
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de pagar la cuota",
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const cuota = await cuotaModel.findByPk(req.params.id);
      if (!cuota) {
        res.status(404).json({ error: "Cuota no encontrada" });
      } else {
        await cuota.destroy();
        res.json({ msg: "Cuota eliminada" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar la cuota",
        error: error.message,
      });
    }
  }

  //Funcion creada para poder crear un horario cuando se crea una inscripcion
  static async instanciarCuota(insc) {
    try {
      let fechaPago = new Date();
      fechaPago = fechaPago.toISOString().split("T")[0];
      let fechaVenc = new Date();
      fechaVenc.setDate(new Date().getDate() + 30);
      fechaVenc = fechaVenc.toISOString().split("T")[0];
      const cuota = await cuotaModel.create({
        idInscripcion: insc.id,
        fechaPago: fechaPago,
        importe: insc.plan.precioMensual,
        fechaVenc: fechaVenc,
      });
      if (cuota) {
        return cuota;
      } else {
        return null;
      }
    } catch (error) {
      // return null;
      throw error;
    }
  }
  //ALTERNATIVA: Puede ser sobrecargar el metodo de crear con un nuevo parametro?
}
