import { Reserva } from '../models/Reserva.js';
import { Ambiente } from '../models/Ambiente.js';
import { Apertura } from '../models/Apertura.js';
import { Disponible } from '../models/Disponible.js';
import { where } from 'sequelize';




export const getReservas = async (req, res) => {

    const data = {
        "tipo_ambiente": "aula comun",
        "cantidad_est": 200,
        "fecha_reserva":"2024-04-16T12:00:00.000Z",
        "periodos": [
          {"id_periodo": 1},
          {"id_periodo": 7},
          {"id_periodo": 3}
        ]
      };


    try {

        const tipoAmbiente = data.tipo_ambiente
        const cantidadEst = data.cantidad_est
        const fecha = data.fecha_reserva

        const periodosArray = data.periodos.map(periodos => periodos.id_periodo)
        console.log(periodosArray)

        const formatoFecha = obtenerParteFecha(fecha)
        const dia = convertirDiaHabil(formatoFecha)

        const ambientes = await Ambiente.findAll();
        const arrayIdsAmbientes = mapearAmbientes(ambientes,cantidadEst,tipoAmbiente);
        console.log(arrayIdsAmbientes)

        const disponiblesAmbienteDia = await obtenerDisponibles(arrayIdsAmbientes, dia ,periodosArray )

        // const idsDisponiblesOcupados = await Reserva.findAll({
        //     attributes:['id_reserva', 'disponible_id'],
        //     where: { fecha_reserva: fecha }
        // })
        
        res.json(disponiblesAmbienteDia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const mapearAmbientes = (ambientes, cantidadEst, tipoAmbiente) => {
    return ambientes
        .map(ambiente => {
            const { id_ambiente, tipo, capacidad, porcentaje_min, porcentaje_max } = ambiente;
            const capacidad_max = Math.floor(capacidad * (porcentaje_max / 100));
            const capacidad_min = Math.floor(capacidad * (porcentaje_min / 100));

            if (
                tipo === tipoAmbiente &&
                capacidad_min <= cantidadEst &&
                cantidadEst <= capacidad_max
            ) {
                return id_ambiente;
            } else {
                return null;
            }
        })
        .filter(id => id !== null);
};


const convertirDiaHabil = (fechaString) => {
    const partesFecha = fechaString.split('-');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; 
    const año = parseInt(partesFecha[2], 10);
    const fecha = new Date(año, mes, dia);
    const diasSemana = ['domingo','lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return diasSemana[fecha.getDay()];
};

const obtenerParteFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0'); 
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
    const año = fecha.getFullYear();
    
    return `${dia}-${mes}-${año}`;
};

const obtenerDisponibles = async (arrayIdsAmbientes, diaFecha, arrayIdsPeriodos) => {

    const disponibles = await Disponible.findAll({
        where: {
            ambiente_id: arrayIdsAmbientes,
            dia: diaFecha,
            periodo_id: arrayIdsPeriodos,
        }
    });
    
    //console.log(disponibles)
    return disponibles

};