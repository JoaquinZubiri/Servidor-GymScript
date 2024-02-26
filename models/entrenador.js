import db from "../db/connection.js";
import { DataTypes } from "sequelize";

export const entrenadorModel = db.define(
    "entrenador",
    {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    },
    { freezeTableName: true, timestamps: false },
    );