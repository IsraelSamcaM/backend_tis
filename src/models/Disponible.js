import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Reserva } from './Reserva.js'
import { Auxiliar_dia } from './Auxiliar_dia.js'

export const Disponible = sequelize.define('disponibles',{
    id_disponible:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
});

Disponible.hasMany(Reserva,{
    foreignKey: 'disponible_id',
    sourceKey: 'id_disponible'
})

Reserva.belongsTo(Disponible,{
    foreignKey: 'disponible_id',
    targetId: 'id_disponible'
})

Disponible.hasMany(Auxiliar_dia,{
    foreignKey: 'disponible_id',
    sourceKey: 'id_disponible'
})

Auxiliar_dia.belongsTo(Disponible,{
    foreignKey: 'disponible_id',
    targetId: 'id_disponible'
})