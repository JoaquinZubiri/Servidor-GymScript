import db from '../db/connection.js'
import { DataTypes } from 'sequelize'

export const planModel = db.define(
  'plan',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precioMensual: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
)
