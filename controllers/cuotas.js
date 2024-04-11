import { cuotaModel } from '../models/cuota.js'
import { inscripcionModel } from '../models/inscripcion.js'
import { planModel } from '../models/plan.js'

import {
  validateCuota,
  validateParcialCuota,
  validateCuotaUpdate
} from '../Schemas/cuota.js'

export class cuotaController {
  static async getAll(req, res) {
    try {
      const idInscripcion = req.query.idInscripcion
      const ultima = req.query.ultima
      const cuota = await parametrosQueryGetAll(idInscripcion, ultima)
      if (cuota.length === 0) {
        res.status(404).json({ msg: 'No se encontraron cuotas registradas' })
      } else {
        res.json(cuota)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener las cuotas',
        error: error.message
      })
    }
  }

  static async getById(req, res) {
    try {
      const cuota = await cuotaModel.findByPk(req.params.id, {
        include: {
          model: inscripcionModel,
          as: 'inscripcion',
          attributes: ['id', 'idPlan', 'idUsuario']
        }
      })
      if (!cuota) {
        res.status(404).json({ error: 'Cuota no encontrada' })
      } else {
        res.json(cuota)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener la cuota',
        error: error.message
      })
    }
  }

  static async getStateCuota(req, res) {
    try {
      const idInscripcion = req.params.id
      const cuota = await cuotaModel.findAll({
        limit: 1,
        order: [['fechaPago', 'DESC']],
        where: { idInscripcion }
      })
      if (!cuota) {
        res.status(404).json({ error: 'Cuota no encontrada' })
      } else {
        const estado = new Date(cuota[0].fechaVenc) < new Date()
        res.json(estado)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener el estado de la cuota',
        error: error.message
      })
    }
  }

  static async update(req, res) {
    try {
      const result = validateCuotaUpdate(req.body)
      if (result.error) {
        res.status(400).json({ error: 'Error ingreso de datos' })
      } else {
        const cuota = await cuotaModel.findByPk(req.params.id)
        if (!cuota) {
          res.status(404).json({ error: 'Cuota no encontrada' })
        } else {
          await cuotaModel.update(result.data, {
            where: { id: req.params.id }
          })
          res.json({ msg: 'Cuota actualizada' }).status(200)
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de actualizar la cuota',
        error: error.message
      })
    }
  }

  static async create(req, res) {
    try {
      const result = validateCuota(req.body)
      if (result.error) {
        res.status(400).json({ error: 'Error ingreso de datos' })
      } else {
        const insc = await inscripcionModel.findByPk(result.data.idInscripcion)
        if (!insc) {
          res.status(404).json({ error: 'Inscripcion no encontrada' })
        } else {
          const cuota = await cuotaModel.create(result.data)
          res.json({ msg: 'Cuota creada' }).status(201)
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de crear la cuota',
        error: error.message
      })
    }
  }

  static async pagar(req, res) {
    try {
      const result = validateParcialCuota(req.body)
      if (result.error) {
        res.status(400).json({ error: 'Error ingreso de datos' })
      } else {
        const insc = await inscripcionModel.findByPk(
          result.data.idInscripcion,
          {
            include: {
              model: planModel,
              as: 'plan',
              attributes: ['precioMensual']
            }
          }
        )
        if (insc == null || insc.fechaBaja !== null) {
          res
            .status(404)
            .json({ error: 'Inscripcion no encontrada o cancelada' })
        } else {
          const idInscripcion = result.data.idInscripcion
          const ultCuota = await cuotaModel.findOne({
            limit: 1,
            order: [['fechaPago', 'DESC']],
            where: { idInscripcion },
            include: {
              model: inscripcionModel,
              as: 'inscripcion',
              attributes: ['id', 'idPlan', 'idUsuario']
            }
          })
          if (ultCuota.fechaVenc > new Date().toISOString().split('T')[0]) {
            res
              .status(404)
              .json({ error: 'Esta inscripcion ya tiene la cuota paga' })
          } else {
            const cuota = await cuotaController.instanciarCuota(insc)
            if (!cuota) {
              res.status(500).json({
                msg: 'Ocurrio un error a la hora de pagar la cuota'
              })
            } else {
              res.json({ msg: 'Cuota pagada' }).status(201)
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de pagar la cuota',
        error: error
      })
    }
  }

  static async delete(req, res) {
    try {
      const cuota = await cuotaModel.findByPk(req.params.id)
      if (!cuota) {
        res.status(404).json({ error: 'Cuota no encontrada' })
      } else {
        await cuota.destroy()
        res.json({ msg: 'Cuota eliminada' })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de eliminar la cuota',
        error: error.message
      })
    }
  }

  static async instanciarCuota(insc) {
    try {
      let fechaPago = new Date()
      fechaPago = fechaPago.toISOString().split('T')[0]
      let fechaVenc = new Date()
      fechaVenc.setDate(new Date().getDate() + 30)
      fechaVenc = fechaVenc.toISOString().split('T')[0]
      const cuota = await cuotaModel.create({
        idInscripcion: insc.id,
        fechaPago: fechaPago,
        importe: insc.plan.precioMensual,
        fechaVenc: fechaVenc
      })
      if (cuota) {
        return cuota
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }
}

async function parametrosQueryGetAll(idInscripcion, ultima) {
  try {
    let cuotas = undefined
    if (idInscripcion && ultima) {
      cuotas = await cuotaModel.findAll({
        limit: 1,
        order: [
          ['fechaPago', 'DESC'],
          ['id', 'DESC']
        ],
        where: { idInscripcion },
        include: {
          model: inscripcionModel,
          as: 'inscripcion',
          attributes: ['id', 'idPlan', 'idUsuario']
        }
      })
    } else if (idInscripcion) {
      cuotas = await cuotaModel.findAll({
        where: { idInscripcion },
        include: {
          model: inscripcionModel,
          as: 'inscripcion',
          attributes: ['id', 'idPlan', 'idUsuario']
        }
      })
    } else if (ultima) {
      cuotas = await cuotaModel.findAll({
        include: {
          model: inscripcionModel,
          as: 'inscripcion',
          attributes: ['id', 'idPlan', 'idUsuario']
        },
        order: [
          ['idInscripcion', 'ASC'],
          ['fechaPago', 'DESC']
        ],
        group: ['idInscripcion']
      })
    } else {
      cuotas = await cuotaModel.findAll({
        include: {
          model: inscripcionModel,
          as: 'inscripcion',
          attributes: ['id', 'idPlan', 'idUsuario']
        }
      })
    }
    return cuotas
  } catch (error) {
    throw error
  }
}
