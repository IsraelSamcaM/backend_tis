import {Ambiente} from '../models/Ambiente.js'

export const getAmbientes = async (req, res) =>{
    try {
        const ambientes = await Ambiente.findAll()
        res.json(ambientes)
        
    } catch (error) {
        return res.status(500).json({message: error.status})
    }
}

export const getAmbiente = async (req, res) =>{
    try {
        const {id_ambiente} = req.params;
        const ambiente = await Ambiente.findOne({where:{id_ambiente}})
        if(!ambiente) return res.status(404).json({message: "El ambiente no existe"})
        res.json(ambiente)
    } catch (error) {
        return res.status(500).json({message: error.status})
    }
}

export const createAmbiente = async (req, res) =>{
    //extraer los datos del body
    const { nombre_ambiente,tipo,capacidad,computadora,ubicacion }= req.body
    try {
        const newAmbiente = await Ambiente.create({
            nombre_ambiente,tipo,capacidad,computadora,ubicacion
        });
        res.json(newAmbiente);
    } catch (error) {
        return res.status(500).json({message: error.status})
    }   
}

export const updateAmbiente = async (req,res)=>{  
    
    try {
        const {id_ambiente} = req.params;
        const {nombre_ambiente,tipo,capacidad,computadora,ubicacion, disponible,proyector} = req.body; 

        const ambiente = await Ambiente.findByPk(id_ambiente)
        ambiente.nombre_ambiente = nombre_ambiente;
        ambiente.tipo = tipo;
        ambiente.capacidad = capacidad;
        ambiente.computadora = computadora;
        ambiente.ubicacion = ubicacion;
        ambiente.disponible = disponible;
        ambiente.proyector = proyector;

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