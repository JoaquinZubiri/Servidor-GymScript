import { planModel } from '../models/plan.js'
import { validatePlanes, validateParcialPlanes } from '../Schemas/planes.js'

export class planController {
  static async getAll(req, res) {
    try {
      const plan = await planModel.findAll()
      if (plan.length === 0) {
        res.status(404).json({ error: 'No se encontraron planes' })
      } else {
        res.json(plan)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener los planes',
        error: error.message
      })
    }
  }
  static async getById(req, res) {
    try {
      const plan = await planModel.findByPk(req.params.id)
      if (!plan) {
        res.status(404).json({ error: 'No se encontro el plan' })
      } else {
        res.json(plan)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener el plan',
        error: error.message
      })
    }
  }

  static async create(req, res) {
    try {
      const result = validatePlanes(req.body)
      if (result.error) {
        res
          .status(400)
          .json({ msg: 'Error ingreso de datos', error: result.error.errors })
      } else {
        await planModel.create(result.data)
        res.status(201).json({ msg: 'Plan creado' })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de crear el plan',
        error: error.message
      })
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialPlanes(req.body)
      if (result.error) {
        res
          .status(400)
          .json({ msg: 'Error ingreso de datos', error: result.error.errors })
      } else {
        const plan = await planModel.findByPk(req.params.id)
        if (!plan) {
          res.status(404).json({ msg: 'No existe el plan' })
        } else {
          await planModel.update(result.data, {
            where: { id: req.params.id }
          })
          res.json({ msg: 'Plan actualizado' }).status(200)
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de actualizar el plan',
        error: error.message
      })
    }
  }

  static async delete(req, res) {
    try {
      const plan = await planModel.findByPk(req.params.id)
      if (!plan) {
        res.status(404).json({ msg: 'No existe el plan' })
      } else {
        await plan.destroy()
        res.json({ msg: 'Plan eliminado' }).status(200)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de eliminar el plan',
        error: error.message
      })
    }
  }
}
