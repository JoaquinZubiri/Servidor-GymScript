import db from "../db/connection.js";
import { DataTypes } from "sequelize";
// imports de relaciones
import { provinciaModel } from "./provincia.js";

export const localidadModel = db.define(
  "localidad",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codPostal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    idProvincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

// Relaciones
provinciaModel.hasMany(localidadModel, {
  foreignKey: "idProvincia",
  sourceKey: "id",
});
localidadModel.belongsTo(provinciaModel, {
  foreignKey: "idProvincia",
  as: "provincia",
});
