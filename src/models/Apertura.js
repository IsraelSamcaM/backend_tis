import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Reserva } from './Reserva.js';
import { Tipo_usuario } from './Tipo_usuario.js';

export const Apertura = sequelize.define('aperturas',{
    id_apertura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    motivo:{
        type: DataTypes.STRING
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
    registro_apertura:{
        type: DataTypes.DATE
    }
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


Apertura.hasMany(Tipo_usuario,{
    foreignKey: 'apertura_id',
    sourceKey: 'id_apertura'
})

Tipo_usuario.belongsTo(Apertura,{
    foreignKey: 'apertura_id',
    targetId: 'id_apertura'
})