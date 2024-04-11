import db from '../db/connection.js'
import { DataTypes } from 'sequelize'
// imports de relaciones
import { entrenadorModel } from './entrenador.js'
import { sedeActividadModel } from './sede-actividad.js'

export const sedeActEntrenadorModel = db.define(
  'sede-act_entrenadores',
  {
    idSedeAct: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEntrenador: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
)

sedeActEntrenadorModel.belongsTo(sedeActividadModel, {
  foreignKey: 'idSedeAct'
})

sedeActividadModel.hasMany(sedeActEntrenadorModel, {
  foreignKey: 'idSedeAct',
  sourceKey: 'id'
})

sedeActEntrenadorModel.belongsTo(entrenadorModel, {
  foreignKey: 'idEntrenador'
})

entrenadorModel.hasMany(sedeActEntrenadorModel, {
  foreignKey: 'idEntrenador',
  sourceKey: 'id'
})
