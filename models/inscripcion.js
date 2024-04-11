import db from '../db/connection.js'
import { DataTypes } from 'sequelize'
// imports de relaciones
import { usuarioModel } from './usuario.js'
import { planModel } from './plan.js'
import { sedeModel } from './sede.js'

export const inscripcionModel = db.define(
  'inscripcion',
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    idPlan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaBaja: {
      type: DataTypes.DATE,
      allowNull: true
    },
    idSede: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
)

inscripcionModel.belongsTo(sedeModel, {
  foreignKey: 'idSede',
  sourceKey: 'id'
})

usuarioModel.hasMany(inscripcionModel, {
  foreignKey: 'idUsuario',
  sourceKey: 'id'
})
inscripcionModel.belongsTo(usuarioModel, { foreignKey: 'idUsuario' })

planModel.hasMany(inscripcionModel, { foreignKey: 'idPlan', sourceKey: 'id' })
inscripcionModel.belongsTo(planModel, { foreignKey: 'idPlan' })
