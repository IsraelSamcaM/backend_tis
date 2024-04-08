import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Reserva } from './Reserva.js';

export const Apertura = sequelize.define('aperturas',{
    id_apertura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    apertura_inicio:{
        type: DataTypes.DATE
    },
    apertura_fin:{
        type: DataTypes.DATE
    },
    reserva_inicio:{
        type: DataTypes.TIME
    },
    reserva_fin:{
        type: DataTypes.TIME
    },
},{
    timestamps: false
});

Apertura.hasMany(Reserva,{
    foreignKey: 'apertura_id',
    sourceKey: 'id_apertura'
})

Reserva.belongsTo(Apertura,{
    foreignKey: 'apertura_id',
    targetId: 'id_apertura'
})
