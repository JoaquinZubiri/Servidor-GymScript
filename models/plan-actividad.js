import db from "../db/connection.js";
import { DataTypes } from "sequelize";
// imports de relaciones
import { actividadModel } from "./actividad.js";
import { planModel } from "./plan.js";

export const planActividadModel = db.define(
  "plan-actividad",
  {
    idPlan: {
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
planActividadModel.belongsTo(planModel, { foreignKey: "idPlan" });

planModel.hasMany(planActividadModel, {
  foreignKey: "idPlan",
  sourceKey: "id",
});

planActividadModel.belongsTo(actividadModel, { foreignKey: "idActividad" });

actividadModel.hasMany(planActividadModel, {
  foreignKey: "idActividad",
  sourceKey: "id",
});
