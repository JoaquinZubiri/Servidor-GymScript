import { productoModel } from "../models/producto.js";
import {
  validateProducto,
  validateParcialProducto,
} from "../Schemas/productos.js";

export class productoController {
  static async getAll(req, res) {
    try {
      const producto = await productoModel.findAll();
      res.json(producto);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los productos",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const producto = await productoModel.findByPk(req.params.id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el producto",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    const result = validateProducto(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    try {
      const producto = await productoModel.create(result.data);
      res.json(producto);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear el producto",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    const result = validateParcialProducto(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ msg: "Error ingreso de datos", error: result.error.errors });
    }
    try {
      const producto = await productoModel.update(result.data, {
        where: { id: req.params.id },
      });
      res.json({
        msg: "Producto actualizado",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar el producto",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const producto = await productoModel.findByPk(req.params.id);
      if (!producto) {
        res.status(400).json({ msg: "No existe el producto" });
      } else {
        await producto.destroy();
        res.json({ msg: "Producto eliminado" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el producto",
        error: error.message,
      });
    }
  }
}
