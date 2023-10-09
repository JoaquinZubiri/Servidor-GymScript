import { productoModel } from "../models/producto.js";

export class productoController {
  static async getAll(req, res) {
    const producto = await productoModel.getAll();
    res.json(producto);
  }
}
