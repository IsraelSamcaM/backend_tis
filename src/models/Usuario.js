import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Grupo } from './Grupo.js' 
import { toDefaultValue } from 'sequelize/lib/utils';


export const Usuario = sequelize.define('usuarios',{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario:{
        type: DataTypes.STRING
    },
    contrasenia_usuario:{
        type: DataTypes.STRING
    },
    email_usuario:{
        type: DataTypes.STRING
    },
    tipo_usuario:{
        type: DataTypes.STRING
    },
    codsiss:{
        type: DataTypes.INTEGER
    },
    disponible:{
        type: DataTypes.BOOLEAN,
        defaultValue:true 
    }
},{
    timestamps: false,
    hooks: {
        beforeValidate: (usuario, options) => {
            usuario.nombre_usuario = usuario.nombre_usuario.toUpperCase();  
            usuario.tipo_usuario = usuario.tipo_usuario.toUpperCase();        
        }
    }
});

Usuario.hasMany(Grupo,{
    foreignKey: 'usuario_id',
    sourceKey: 'id_usuario'
})

Grupo.belongsTo(Usuario,{
    foreignKey: 'usuario_id',
    targetId: 'id_usuario'
})