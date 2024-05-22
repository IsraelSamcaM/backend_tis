import {Ambiente} from '../models/Ambiente.js'
import {Disponible} from '../models/Disponible.js'
import {Periodo} from '../models/Periodo.js'
import {Baja} from '../models/Baja.js'
import { Usuario } from '../models/Usuario.js';
import { Reserva } from '../models/Reserva.js';

import { sequelize } from "../database/database.js";
import moment from 'moment';

export const getAmbientes = async (req, res) =>{
    try {
        const ambientes = await Ambiente.findAll({
            raw: true,
            order: [['actualizacion', 'DESC'], ['id_ambiente', 'DESC']]
        });
        
        const ambientesFormateados = ambientes.map(ambiente => {
            const idFormateado = ambiente.id_ambiente.toString().padStart(3, '0');
            return {
                ...ambiente,
                id_ambiente_tabla : idFormateado
            };
        });

        res.json(ambientesFormateados);
    } catch (error) {
        return res.status(500).json({ message: error.status });
    }
};


export const getAmbiente = async (req, res) => {
    try {
        const { id_ambiente } = req.params;
        const ambiente = await Ambiente.findOne({ where: { id_ambiente } });
        if (!ambiente) return res.status(404).json({ message: "El ambiente no existe" });
        const idFormateado = String(id_ambiente).padStart(3, '0'); 
        const ambienteFormateado = {
            ...ambiente.toJSON(), 
            id_ambiente: idFormateado
        };
        res.json(ambienteFormateado); 
    } catch (error) {
        return res.status(500).json({ message: error.status });
    }
}

export const createAmbienteCompleto = async (req, res) => {
    try {
        const { nombre_ambiente, tipo, capacidad, disponible, computadora, proyector, ubicacion, dia, porcentaje_min, porcentaje_max } = req.body;
        
        const ambiente = await Ambiente.create({
            nombre_ambiente,
            tipo,
            capacidad,
            disponible,
            computadora,
            proyector,
            ubicacion,
            porcentaje_min,
            porcentaje_max,
            actualizacion: moment().tz("America/La_Paz").toDate()
        });

        for (const diaNombre in dia) { 
            const periodos = dia[diaNombre].periodos; 
            for (const periodo of periodos) {
                await Disponible.create({
                    ambiente_id: ambiente.id_ambiente,
                    dia: diaNombre, 
                    periodo_id: periodo.id_periodo,
                    habilitado: true
                });
            }
        }
        return res.status(201).json({ message: 'Ambiente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear ambiente completo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};






export const createAmbiente = async (req, res) =>{
    //extraer los datos del body

    const { nombre_ambiente,tipo,capacidad,disponible,computadora,proyector,ubicacion ,porcentaje_min,porcentaje_max }= req.body
    try {
        const newAmbiente = await Ambiente.create({
            nombre_ambiente,tipo,capacidad,disponible,computadora,proyector,ubicacion,porcentaje_min,porcentaje_max
        });
        res.json(newAmbiente);
    } catch (error) {
        return res.status(500).json({message: error.status})
    }   
}


export const updateAmbiente = async (req,res)=>{  
    
    try {
        const {id_ambiente} = req.params;
        const {nombre_ambiente,tipo,capacidad,computadora,ubicacion, disponible,proyector,porcentaje_min,porcentaje_max} = req.body; 

        const ambiente = await Ambiente.findByPk(id_ambiente)

        ambiente.nombre_ambiente = nombre_ambiente;
        ambiente.tipo = tipo;
        ambiente.capacidad = capacidad;
        ambiente.computadora = computadora;
        ambiente.ubicacion = ubicacion;
        ambiente.disponible = disponible;
        ambiente.proyector = proyector;
        ambiente.porcentaje_min = porcentaje_min;
        ambiente.porcentaje_max = porcentaje_max;

        await ambiente.save()

        res.json(ambiente)
    } catch (error) {
        return res.status(500).json({message: error.status})
    }

}

export const deleteAmbiente = async (req, res) => {
    try {
        const { id_ambiente } = req.params;
        await Ambiente.destroy({ where: { id_ambiente } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const editarAmbienteCompleto = async (req, res) => {
    try {
        //const {  } = req.params.id_ambiente;
        const {id_ambiente , nombre_ambiente, tipo, capacidad, disponible, computadora, proyector, ubicacion, dia, porcentaje_min, porcentaje_max } = req.body;
        console.log(id_ambiente)
        
        await Ambiente.update({
            nombre_ambiente,
            tipo,
            capacidad,
            disponible,
            computadora,
            proyector,
            ubicacion,
            porcentaje_min,
            porcentaje_max,
            actualizacion: sequelize.literal('CURRENT_TIMESTAMP - interval \'4 hours\'')
        }, {
            where: {
                id_ambiente: id_ambiente
            }
        });

        await Disponible.update(
            { habilitado: false },
            {
                where: {
                    ambiente_id: id_ambiente
                }
            }
        );
        
        for (const diaNombre in dia) { 
            const periodos = dia[diaNombre].periodos; 
            for (const periodo of periodos) {
                const [updatedCount] = await Disponible.update(
                    { habilitado: true },
                    {
                        where: {
                            ambiente_id: id_ambiente,
                            dia: diaNombre,
                            periodo_id: periodo.id_periodo
                        }
                    }
                );
                if (updatedCount === 0) {
                    await Disponible.create({
                        ambiente_id: id_ambiente,
                        dia: diaNombre,
                        periodo_id: periodo.id_periodo,
                        habilitado: true
                    });
                }
            }
        }

        return res.status(200).json({ message: 'Ambiente editado exitosamente' });
    } catch (error) {
        console.error('Error al editar ambiente completo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const registrarBaja = async (req, res) => {
    try {
        const { id_ambiente, motivo } = req.body;

        const createBaja = await Baja.create({
            ambiente_id: id_ambiente,
            motivo,
        });

        const ambiente = await Ambiente.findByPk(id_ambiente);
        ambiente.disponible = false;
        ambiente.actualizacion = sequelize.literal('CURRENT_TIMESTAMP - interval \'4 hours\'')
        await ambiente.save();

        const disponibles = await Disponible.findAll({
            attributes: ['id_disponible'],
            where: {
                ambiente_id: id_ambiente,
            },
        });
        const dispIds = disponibles.map(disponible => disponible.id_disponible);

        await Reserva.update(
            { estado: 'cancelado' },
            {
                where: {
                    disponible_id: dispIds,
                    estado: 'vigente',
                },
            }
        );

        return res.json(createBaja);
    } catch (error) {
        console.error('Error al editar ambiente completo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};



export const registrarAlta = async (req, res) => {
    try {
        const { id_ambiente } = req.params

        const ambiente = await Ambiente.findByPk(id_ambiente);
        ambiente.disponible = true;
        ambiente.actualizacion = sequelize.literal('CURRENT_TIMESTAMP - interval \'4 hours\'')
        await ambiente.save();
        

        return res.json(ambiente);
    } catch (error) {
        console.error('Error al editar ambiente completo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

