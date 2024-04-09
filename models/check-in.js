import db from "../db/connection.js";
import { DataTypes } from "sequelize";
import { usuarioModel } from "./usuario.js";
import { sedeModel } from "./sede.js";

export const checkInModel = db.define(
  "checkin",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idSede: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

checkInModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });

usuarioModel.hasMany(checkInModel, {
  foreignKey: "idUsuario",
  sourceKey: "id",
});

checkInModel.belongsTo(sedeModel, { foreignKey: "idSede" });

sedeModel.hasMany(checkInModel, {
  foreignKey: "idSede",
  sourceKey: "id",
});
