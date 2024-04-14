import { validateProvincia } from '../Schemas/provincias.js'
import { provinciaModel } from '../models/provincia.js'

export class provinciasController {
  static async getAll(req, res) {
    try {
      const provincias = await provinciaModel.findAll()
      if (provincias.length === 0) {
        res.status(404).json({ msg: 'No se encontraron provincias' })
      } else {
        res.json(provincias)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener las provincias',
        error: error.message
      })
    }
  }

  static async getById(req, res) {
    try {
      const provincia = await provinciaModel.findByPk(req.params.id)
      if (!provincia) {
        res.status(404).json({ msg: 'No se encontro provincia' })
      } else {
        res.json(provincia)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de obtener la provincia',
        error: error.message
      })
    }
  }

  static async create(req, res) {
    try {
      const result = validateProvincia(req.body)
      if (result.error) {
        res
          .status(400)
          .json({ msg: 'Error ingreso de datos', error: result.error.errors })
      } else {
        await provinciaModel.create(result.data)
        res.json({ msg: 'Provincia creada' }).status(201)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de crear la provincia',
        error: error.message
      })
    }
  }

  static async update(req, res) {
    try {
      const result = validateProvincia(req.body)
      if (result.error) {
        res
          .status(400)
          .json({ msg: 'Error ingreso de datos', error: result.error.errors })
      } else {
        const provincia = await provinciaModel.findByPk(req.params.id)
        if (!provincia) {
          res.status(404).json({ msg: 'No existe la provincia' })
        } else {
          await provinciaModel.update(result.data, {
            where: { id: req.params.id }
          })
          res.json({ msg: 'Provincia actualizada' }).status(200)
        }
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de actualizar la provincia',
        error: error.message
      })
    }
  }

  static async delete(req, res) {
    try {
      const provincia = await provinciaModel.findByPk(req.params.id)
      if (!provincia) {
        res.status(404).json({ msg: 'No existe la provincia' })
      } else {
        await provincia.destroy()
        res
          .json({
            msg: 'Provincia eliminada'
          })
          .status(200)
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocurrio un error a la hora de eliminar la provincia',
        error: error.message
      })
    }
  }
}
