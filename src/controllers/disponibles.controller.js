

import { Disponible  } from '../models/Disponible.js'; // Asegúrate de importar correctamente tu modelo
import { Periodo } from '../models/Periodo.js'; // Asegúrate de importar correctamente tu modelo
import { Ambiente  } from '../models/Ambiente.js'; // Asegúrate de importar correctamente tu modelo


export const disponibilidadPorAmbiente = async (req, res) => {
    try {
        const { id_ambiente } = req.params; 
        
        const disponibilidad = await Disponible.findAll({
            where: {
                ambiente_id: id_ambiente 
            },
            include: [{
                model: Periodo, 
                attributes: ['nombre_periodo', 'hora_inicio', 'hora_fin'] 
            }]
        });

        const disponibilidadPorDia = {};

        disponibilidad.forEach(entry => {
            const { dia } = entry;

            if (!disponibilidadPorDia[dia]) {
                disponibilidadPorDia[dia] = [];
            }
            disponibilidadPorDia[dia].push(entry);
        });

        return res.status(200).json(disponibilidadPorDia);
    } catch (error) {
        console.error('Error al obtener disponibilidad por ambiente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

