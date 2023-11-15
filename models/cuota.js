import db from "../db/connection.js";
import { DataTypes } from "sequelize";
// imports de relaciones
import { inscripcionModel } from "./inscripcion.js";

export const cuotaModel = db.define(
  "cuota",
  {
    idInscripcion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    importe: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaVenc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

// Relaciones
inscripcionModel.hasMany(cuotaModel, {
  foreignKey: "idInscripcion",
  sourceKey: "id",
});

cuotaModel.belongsTo(inscripcionModel, {
  foreignKey: "idInscripcion",
  as: "inscripcion",
});
