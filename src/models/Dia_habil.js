import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Auxiliar_dia } from './Auxiliar_dia.js'

export const Dia_habil = sequelize.define('dias_habiles',{
    id_dia_habil:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia:{
        type: DataTypes.STRING
    },
    hora_inicio:{
        type: DataTypes.TIME
    },
    hora_fin:{
        type: DataTypes.TIME
    }
},{
    timestamps: false
});

Dia_habil.hasMany(Auxiliar_dia,{
    foreignKey: 'dia_habil_id',
    sourceKey: 'id_dia_habil'
})

Auxiliar_dia.belongsTo(Dia_habil,{
    foreignKey: 'dia_habil_id',
    targetId: 'id_dia_habil'
})
