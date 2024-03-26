import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Grupo } from './Grupo.js' 


export const Materia = sequelize.define('materias',{
    id_materia:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_materia:{
        type: DataTypes.STRING
    },
    nivel_materia:{
        type: DataTypes.STRING
    }
},{
    timestamps: false
})

Materia.hasMany(Grupo,{
    foreignKey: 'materia_id',
    sourceKey: 'id_materia'
})

Grupo.belongsTo(Materia,{
    foreignKey: 'materia_id',
    targetId: 'id_materia'
})