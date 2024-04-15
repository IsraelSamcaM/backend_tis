import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Auxiliar_reserva } from './Auxiliar_reserva.js' 

export const Reserva = sequelize.define('reservas',{
    id_reserva:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    motivo:{
        type: DataTypes.STRING
    },
    fecha_reserva:{
        type: DataTypes.DATE
    },
    hora:{
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
    },
    fecha:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    timestamps: false
});

Reserva.hasMany(Auxiliar_reserva,{
    foreignKey: 'reserva_id',
    sourceKey: 'id_reserva'
})

Auxiliar_reserva.belongsTo(Reserva,{
    foreignKey: 'reserva_id',
    targetId: 'id_reserva'
})