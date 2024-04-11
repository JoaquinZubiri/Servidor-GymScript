import { sedeActEntrenadorModel } from '../models/sede-act_entrenador.js'
import { entrenadorModel } from '../models/entrenador.js'
import { sedeActividadModel } from '../models/sede-actividad.js'
import {
  validateSedeActEntrenadores,
  validateParcialSedeActEntrenadores
} from '../Schemas/sede-act_entrenadores.js'

export class sedeActEntrenadorController {
  static async getAll(req, res) {
    try {
      const idSedeAct = req.query.idSedeAct
      const idEntrenador = req.query.idEntrenador
      const sedeActEntrenadores = await parametrosQueryGetAll(
        idSedeAct,
        idEntrenador
      )
      if (sedeActEntrenadores.length === 0) {
        res.status(404).json({
          msg: 'No se encontraron sedes-actividades asociadas a un entrenador'
        })
      } else {
        res.status(200).json(sedeActEntrenadores)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener las sedes asociadas a una actividad y un entrenador',
        error: error.message
      })
    }
  }

  static async getById(req, res) {
    try {
      const sedeActEntrenador = await sedeActEntrenadorModel.findByPk(
        req.params.id,
        {
          include: [
            {
              model: sedeActividadModel,
              as: 'sedes_actividade',
              attributes: ['id', 'idSede', 'idActividad']
            },
            {
              model: entrenadorModel,
              as: 'entrenador',
              attributes: ['id', 'nombre', 'apellido', 'telefono']
            }
          ]
        }
      )
      if (!sedeActEntrenador) {
        res.status(404).json({
          msg: 'Sede-actividad asociada a un entrenador no encontrada'
        })
      } else {
        res.status(200).json(sedeActEntrenador)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener la sede-actividad asociada a un entrenador',
        error: error.message
      })
    }
  }

  static async create(req, res) {
    try {
      const result = validateSedeActEntrenadores(req.body)
      if (result.error) {
        res.status(400).json({
          msg: 'Error en el ingreso de datos',
          error: result.error.message
        })
      } else {
        await sedeActEntrenadorModel.create(result.data)
        res
          .status(201)
          .json({ msg: 'Asociacion sede-actividad con entrenador creada' })
      }
    } catch (error) {
      if (error.message.includes('foreign key constraint fails')) {
        res.status(400).json({
          msg: 'La sede-actividad o el entrenador ingresado no existen'
        })
      } else {
        res.status(500).json({
          msg: 'Ocurrio un error a la hora de crear la sede-actividad asociada a un entrenador',
          error: error.message
        })
      }
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialSedeActEntrenadores(req.body)
      if (result.error) {
        res.status(400).json({
          msg: 'Error en el ingreso de datos',
          error: result.error.message
        })
      } else {
        const sedeActEntrenador = await sedeActEntrenadorModel.findByPk(
          req.params.id
        )
        if (!sedeActEntrenador) {
          res.status(404).json({
            msg: 'Asociacion sede-actividad con entrenador no encontrada'
          })
        } else {
          await sedeActEntrenadorModel.update(result.data, {
            where: {
              id: req.params.id
            }
          })
          res.status(200).json({
            msg: 'Asociacion sede-actividad con entrenador actualizada'
          })
        }
      }
    } catch (error) {
      if (error.message.includes('foreign key constraint fails')) {
        res.status(400).json({
          msg: 'La sede-actividad o el entrenador ingresado no existen'
        })
      } else {
        res.status(500).json({
          msg: 'Ocurrio un error a la hora de actualizar la sede-actividad asociada a un entrenador',
          error: error.message
        })
      }
    }
  }

  static async delete(req, res) {
    try {
      const sedeActEntrenador = await sedeActEntrenadorModel.findByPk(
        req.params.id
      )
      if (!sedeActEntrenador) {
        res.status(404).json({
          msg: 'Sede-actividad asociada a un entrenador no encontrada'
        })
      } else {
        await sedeActEntrenadorModel.destroy({
          where: {
            id: req.params.id
          }
        })
        res
          .status(200)
          .json({ msg: 'Sede-actividad asociada a un entrenador eliminada' })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de eliminar la sede-actividad asociada a un entrenador',
        error: error.message
      })
    }
  }
  s
}

async function parametrosQueryGetAll(idSedeAct, idEntrenador) {
  try {
    let sedeActEntrenadores = []
    if (idSedeAct && idEntrenador) {
      sedeActEntrenadores = await sedeActEntrenadorModel.findAll({
        where: {
          idSedeAct: idSedeAct,
          idEntrenador: idEntrenador
        },
        include: [
          {
            model: sedeActividadModel,
            as: 'sedes_actividade',
            attributes: ['id', 'idSede', 'idActividad']
          },
          {
            model: entrenadorModel,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellido', 'telefono']
          }
        ]
      })
    } else if (idSedeAct) {
      sedeActEntrenadores = await sedeActEntrenadorModel.findAll({
        where: {
          idSedeAct: idSedeAct
        },
        include: [
          {
            model: sedeActividadModel,
            as: 'sedes_actividade',
            attributes: ['id', 'idSede', 'idActividad']
          },
          {
            model: entrenadorModel,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellido', 'telefono']
          }
        ]
      })
    } else if (idEntrenador) {
      sedeActEntrenadores = await sedeActEntrenadorModel.findAll({
        where: {
          idEntrenador: idEntrenador
        },
        include: [
          {
            model: sedeActividadModel,
            as: 'sedes_actividade',
            attributes: ['id', 'idSede', 'idActividad']
          },
          {
            model: entrenadorModel,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellido', 'telefono']
          }
        ]
      })
    } else {
      sedeActEntrenadores = await sedeActEntrenadorModel.findAll({
        include: [
          {
            model: sedeActividadModel,
            as: 'sedes_actividade',
            attributes: ['id', 'idSede', 'idActividad']
          },
          {
            model: entrenadorModel,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellido', 'telefono']
          }
        ]
      })
    }
    return sedeActEntrenadores
  } catch (error) {
    return []
  }
}
