import {Ambiente} from '../models/Ambiente.js'
import {Disponible} from '../models/Disponible.js'

export const getAmbientes = async (req, res) =>{
    try {
        const ambientes = await Ambiente.findAll()
        res.json(ambientes)
    } catch (error) {
        return res.status(500).json({message: error.status})
    }
}


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
            porcentaje_max
        });

        for (const diaNombre in dia) { 
            const periodos = dia[diaNombre].periodos; 
            for (const periodo of periodos) {
                await Disponible.create({
                    ambiente_id: ambiente.id_ambiente,
                    dia: diaNombre, 
                    periodo_id: periodo.id_periodo
                    
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

export const ivangay = async (req, res) => {
    res.json({message: "soy ivan gay"})
}