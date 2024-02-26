import { validateEntrenador, validateParcialEntrenador } from "../Schemas/entrenadores.js";
import { entrenadorModel } from "../models/entrenador.js";

export class entrenadoresController {

    static async getAll(req, res) {
        try {
            const entrenadores = await entrenadorModel.findAll();
            if (entrenadores.length === 0) {
                res.status(404).json({ msg: "No se encontraron entrenadores" });
            } else {
                res.json(entrenadores);
            }
        } catch (error) {
            res.status(500).json({
                msg: "Ocurrio un error a la hora de obtener los entrenadores",
                error: error.message,
            });
        }
    }

    static async getById(req, res) {
        try {
            const entrenador = await entrenadorModel.findByPk(req.params.id);
            if (!entrenador) {
                res.status(404).json({ msg: "No se encontro el entrenador" });
            } else {
                res.json(entrenador);
            }
        } catch (error) {
            res.status(500).json({
                msg: "Ocurrio un error a la hora de obtener el entrenador",
                error: error.message,
            });
        }
    }

    static async create(req, res) {
        try {
            const result = validateEntrenador(req.body);
            if (result.error) {
                res.status(400).json({ msg: "Error ingreso de datos", error: result.error.errors });
            } else {
                await entrenadorModel.create(result.data);
                res.status(201).json({ msg: "Entrenador creado" });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Ocurrio un error a la hora de crear el entrenador",
                error: error.message,
            });
        }
    }

    static async update(req, res) {
        try {
            const result = validateParcialEntrenador(req.body);
            if (result.error) {
                res.status(400).json({ msg: "Error ingreso de datos", error: result.error.errors });
            } else {
                const entrenador = await entrenadorModel.findByPk(req.params.id);
                if (!entrenador) {
                    res.status(404).json({ msg: "No se encontro el entrenador" });
                } else {
                    await entrenadorModel.update(result.data, { where: { id: req.params.id } });
                    res.json({ msg: "Entrenador actualizado" });
                }
            }
        } catch (error) {
            res.status(500).json({
                msg: "Ocurrio un error a la hora de actualizar el entrenador",
                error: error.message,
            });
        }
    }

    static async delete(req, res) {
        try {
            const entrenador = await entrenadorModel.findByPk(req.params.id);
            if (!entrenador) {
                res.status(404).json({ msg: "No se encontro el entrenador" });
            } else {
                await entrenadorModel.destroy({ where: { id: req.params.id } });
                res.json({ msg: "Entrenador eliminado" });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Ocurrio un error a la hora de eliminar el entrenador",
                error: error.message,
            });
        }
    }

}