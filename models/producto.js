import db from '../db/connection.js'
import { DataTypes } from 'sequelize'

export const productoModel = db.define(
  'producto',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  { freezeTableName: true, timestamps: false }
)
