import db from "../db/connection.js";
import { DataTypes, QueryTypes } from "sequelize";
// imports de relaciones
import { sedeActividadModel } from "./sede-actividad.js";

export const horarioModel = db.define(
  "horario",
  {
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horaDesde: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaHasta: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    idSedeAct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

export async function validateHorarioRepetido(result, horario) {
  let idSedeAct = result.idSedeAct;
  let dia = result.dia;
  let hDesde = result.horaDesde;
  let hHasta = result.horaHasta;
  if (horario) {
    let replacements = [];
    replacements.push(idSedeAct || horario.idSedeAct);
    replacements.push(dia || horario.dia);
    replacements.push(hHasta || horario.horaHasta);
    replacements.push(hDesde || horario.horaDesde);
    replacements.push(horario.id);
    return await db.query(
      "select * from horario where idSedeAct = ? and dia = ? and not(? < horaDesde or ? > horaHasta) and id != ?",
      {
        replacements: replacements,
        type: QueryTypes.SELECT,
      }
    );
  } else {
    return await db.query(
      "select * from horario where idSedeAct = ? and dia = ? and not(? < horaDesde or ? > horaHasta)",
      {
        replacements: [idSedeAct, dia, hHasta, hDesde],
        type: QueryTypes.SELECT,
      }
    );
  }
}

// Relaciones
sedeActividadModel.hasMany(horarioModel, {
  foreignKey: "idSedeAct",
  sourceKey: "id",
});
horarioModel.belongsTo(sedeActividadModel, {
  foreignKey: "idSedeAct",
  as: "sedes_actividades",
});
