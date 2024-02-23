import db from "../db/connection.js";
import { DataTypes } from "sequelize";
// imports de relaciones
import { localidadModel } from "./localidad.js";

export const sedeModel = db.define(
  "sede",
  {
    direccion: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    idLocalidad: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false },
);

// Relaciones
localidadModel.hasMany(sedeModel, {
  foreignKey: "idLocalidad",
  sourceKey: "id",
});

sedeModel.belongsTo(localidadModel, {
  foreignKey: "idLocalidad",
  as: "localidad",
});
