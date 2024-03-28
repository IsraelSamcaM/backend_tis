import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Auxiliar_reserva } from './Auxiliar_reserva.js' 


export const Grupo = sequelize.define('grupos',{
    id_grupo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_grupo:{
        type: DataTypes.STRING
    },
    docente:{
        type: DataTypes.STRING
    },
    cantidad_est:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false
})


Grupo.hasMany(Auxiliar_reserva,{
    foreignKey: 'grupo_id',
    sourceKey: 'id_grupo'
})

Auxiliar_reserva.belongsTo(Grupo,{
    foreignKey: 'grupo_id',
    targetId: 'id_grupo'
})