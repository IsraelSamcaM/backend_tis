import { Reserva } from '../models/Reserva.js';
import { Ambiente } from '../models/Ambiente.js';
import { Apertura } from '../models/Apertura.js';
import { Disponible } from '../models/Disponible.js';
import { Periodo } from '../models/Periodo.js';
import { Auxiliar_reserva } from '../models/Auxiliar_reserva.js';



// {
//     "id_disponible": 5,
//     "fecha_reserva":"2024-04-17",
//     "motivo": "Cositas",
//     "id_aux_grupo": 2,
//     "id_apertura": 2 //por defecto
//   }
  
export const createReserva = async (req, res) => {

    const { id_disponible, fecha_reserva,motivo,id_aux_grupo,id_apertura } = req.body;
    try {
        const newReserva = await Reserva.create({ 
            disponible_id: id_disponible, 
            fecha_reserva: fecha_reserva + "T00:00:00.000Z",
            motivo: motivo,
            apertura_id: id_apertura
        });

        const newAuxReserva = await Auxiliar_reserva.create({
            reserva_id: newReserva.id_reserva,
            aux_grupo_id: id_aux_grupo
        })


        res.json(newReserva);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTablaDisponibles = async (req, res) => {  
    try {
        const data = req.body
        const tipoAmbiente = data.tipo_ambiente
        const cantidadEst = data.cantidad_est
        const fechaInicial = data.fecha_reserva
        const fecha = fechaInicial+ "T12:00:00.000Z"
        console.log(fecha)

        const periodosArray = data.periodos.map(periodos => periodos.id_periodo)
        console.log(periodosArray)

        const formatoFecha = obtenerParteFecha(fecha)
        const dia = convertirDiaHabil(formatoFecha)

        const ambientes = await Ambiente.findAll();
        const arrayIdsAmbientes = mapearAmbientes(ambientes,cantidadEst,tipoAmbiente);
        console.log(arrayIdsAmbientes)

        const disponiblesAmbienteDia = await obtenerDisponibles(arrayIdsAmbientes, dia ,periodosArray )

        const idsExcluir = await obtenerOcupados(fecha)
        console.log(idsExcluir)

        const resultadoFiltrado = disponiblesAmbienteDia.filter(disponible => !idsExcluir.includes(disponible.id_disponible))

        const ambientesDisponibles = await obtenerDetallesReservas(resultadoFiltrado, fechaInicial)
        
        res.json(ambientesDisponibles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const mapearAmbientes = (ambientes, cantidadEst, tipoAmbiente) => {
    return ambientes
        .map(ambiente => {
            const { id_ambiente, tipo, capacidad, disponible ,porcentaje_min, porcentaje_max } = ambiente;
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

const obtenerOcupados = async (fechaReserva) => {
    const reservas = await Reserva.findAll({
        attributes:['disponible_id'],
        where: {
            fecha_reserva: fechaReserva,
        }
    });
    const ocupados = reservas.map(reserva => reserva.disponible_id)
    return ocupados
};

const obtenerDetallesReservas = async (disponiblesAmbienteDia, fechaReserva) => {
    const detallesReservas = [];

    for (const disponible of disponiblesAmbienteDia) {
        const periodo = await Periodo.findOne({
            where: { id_periodo: disponible.periodo_id }
        });

        const ambiente = await Ambiente.findOne({
            where: { id_ambiente: disponible.ambiente_id }
        });

        detallesReservas.push({
            id_disponible: disponible.id_disponible,
            dia: disponible.dia,
            periodo_id: disponible.periodo_id,

            nombre_periodo: periodo.nombre_periodo,
            hora_inicio: periodo.hora_inicio,
            hora_fin: periodo.hora_fin,

            ambiente_id: disponible.ambiente_id,
            nombre_ambiente: ambiente.nombre_ambiente,
            tipo_ambiente: ambiente.tipo,
            capacidad_ambiente: ambiente.capacidad,
            estado: "Habilitado", 
            fecha: fechaReserva
        });
    }

    return detallesReservas;
};