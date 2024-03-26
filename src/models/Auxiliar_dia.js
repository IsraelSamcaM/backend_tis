import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'


export const Auxiliar_dia = sequelize.define('auxiliar_dias',{
    id_auxiliar_dia:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
});
