import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'


export const Tipo_usuario = sequelize.define('tipo_usuarios',{
    id_tipo_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    docente:{
        type: DataTypes.BOOLEAN
    },
    auxiliar:{
        type: DataTypes.BOOLEAN
    }
},{
    timestamps: false
});

