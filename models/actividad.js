import db from '../db/connection.js'
import { DataTypes } from 'sequelize'

export const actividadModel = db.define(
  'actividad',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
)
