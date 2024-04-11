import db from '../db/connection.js'
import { DataTypes } from 'sequelize'

export const provinciaModel = db.define(
  'provincia',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  { freezeTableName: true, timestamps: false }
)
