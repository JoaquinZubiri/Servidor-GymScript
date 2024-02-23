import db from "../db/connection.js";
import { DataTypes } from "sequelize";
// imports de relaciones
import { actividadModel } from "./actividad.js";
import { sedeModel } from "./sede.js";

export const sedeActividadModel = db.define(
  "sedes_actividades",
  {
    idSede: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false },
);

// Relaciones
sedeActividadModel.belongsTo(sedeModel, { foreignKey: "idSede" });

sedeModel.hasMany(sedeActividadModel, {
  foreignKey: "idSede",
  sourceKey: "id",
});

sedeActividadModel.belongsTo(actividadModel, { foreignKey: "idActividad" });

actividadModel.hasMany(sedeActividadModel, {
  foreignKey: "idActividad",
  sourceKey: "id",
});
