import { horarioModel, validateHorarioRepetido } from "../models/horario.js";
import { sedeActividadModel } from "../models/sede-actividad.js";
import { QueryTypes, Op, fn, col } from "sequelize";

import { validateHorario, validateParcialHorario } from "../Schemas/horario.js";

export class horarioController {
  static async getAll(req, res) {
    try {
      const idSedeAct = req.query.idSedeAct;
      const idActividad = req.query.idActividad;
      const idSede = req.query.idSede;
      let horario = [];
      // select dia, group_concat(concat(horaDesde, "-", horaHasta)) as horarios from horario group by dia order by field(dia, 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo');
      if (idActividad && idSede) {
        horario = await horarioModel.findAll({
          attributes: [
            "dia",
            [
              fn(
                "GROUP_CONCAT",
                fn("CONCAT", col("horaDesde"), " - ", col("horaHasta"))
              ),
              "horario",
            ],
          ],
          group: ["dia"],
          order: [
            fn(
              "FIELD",
              col("dia"),
              "lunes",
              "martes",
              "miércoles",
              "jueves",
              "viernes",
              "sábado",
              "domingo"
            ),
          ],
          include: {
            model: sedeActividadModel,
            as: "sedes_actividades",
            attributes: ["idSede", "idActividad"],
            where: {
              idActividad: idActividad,
              idSede: idSede,
            },
          },
        });
      } else if (idSedeAct) {
        horario = await horarioModel.findAll({
          where: { idSedeAct: idSedeAct },
          include: {
            model: sedeActividadModel,
            as: "sedes_actividades",
            attributes: ["idSede", "idActividad"],
          },
        });
      } else {
        horario = await horarioModel.findAll({
          include: {
            model: sedeActividadModel,
            as: "sedes_actividades",
            attributes: ["idSede", "idActividad"],
          },
        });
      }
      if (horario.length === 0) {
        res.status(404).json({ msg: "No se encontraron horarios" });
      } else {
        res.json(horario);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los horarios",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const horario = await horarioModel.findByPk(req.params.id, {
        include: {
          model: sedeActividadModel,
          as: "sedes_actividades",
          attributes: ["idSede", "idActividad"],
        },
      });
      if (!horario) {
        res.status(404).json({ error: "Horario no encontrado" });
      } else {
        res.json(horario);
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el horario",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateHorario(req.body);
      if (result.error) {
        res.status(400).json({ error: result.error.message });
      } else {
        //VALIDAR QUE NO HAYA OTRO HORARIO QUE SE INTERPONGA EN EL MISMO DIA Y HORA DE LA MISMA SEDE-ACT
        if (!validateTime(result.data.horaDesde, result.data.horaHasta)) {
          res.status(400).json({
            msg: "La hora de inicio no puede ser mayor a la hora de fin",
          });
        } else {
          const horarioRepetido = await validateHorarioRepetido(result.data);
          if (horarioRepetido.length > 0) {
            res.status(400).json({
              msg: "Ya existe un horario que se interpone en el mismo dia y hora",
            });
          } else {
            await horarioModel.create(result.data);
            res.status(201).json({ msg: "Horario creado" });
          }
        }
      }
    } catch (error) {
      //if de manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "La relacion sede-actividad ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de crear el horario",
          error: error.message,
        });
      }
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialHorario(req.body);
      if (result.error) {
        res.status(400).json({
          msg: "Error en el ingreso de datos",
          error: result.error.message,
        });
      } else {
        const horario = await horarioModel.findByPk(req.params.id);
        if (!horario) {
          res.status(404).json({ msg: "Horario no encontrado" });
        } else {
          if (
            !validateTime(result.data.horaDesde, result.data.horaHasta, horario)
          ) {
            res.status(400).json({
              msg: "La hora de inicio no puede ser mayor a la hora de fin",
            });
          } else {
            //VALIDAR QUE LOS HORARIOS SEAN COHERENTES
            const horarioRepetido = await validateHorarioRepetido(
              result.data,
              horario
            );
            if (horarioRepetido.length > 0) {
              res.status(400).json({
                msg: "Ya existe un horario que se interpone en el mismo dia y hora",
              });
            } else {
              await horarioModel.update(result.data, {
                where: { id: req.params.id },
              });
              res.status(200).json({ msg: "Horario actualizado" });
            }
          }
        }
      }
    } catch (error) {
      //if de manejo de error de cada FK
      if (error.message.includes("foreign key constraint fails")) {
        res
          .status(400)
          .json({ msg: "La relacion sede-actividad ingresada no existe" });
      } else {
        res.status(500).json({
          msg: "Ocurrio un error a la hora de actualizar el horario",
          error: error.message,
        });
      }
    }
  }

  static async delete(req, res) {
    try {
      const horario = await horarioModel.findByPk(req.params.id);
      if (!horario) {
        res.status(404).json({ msg: "Horario no encontrado" });
      } else {
        await horarioModel.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: "Horario eliminado" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el horario",
        error: error.message,
      });
    }
  }
}

function validateTime(hDesde, hHasta, horario) {
  return hDesde && hHasta
    ? hDesde < hHasta
    : hDesde
      ? hDesde < horario.horaHasta
      : hHasta
        ? horario.horaDesde < hHasta
        : true;
}
