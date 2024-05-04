import { Apertura } from '../models/Apertura.js';
import { Op } from 'sequelize';

export const getAperturas = async (req, res) => {
    try {
        const aperturas = await Apertura.findAll({
            order: [['id_apertura', 'DESC']],
        });

        res.json(aperturas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAperturasTabla = async (req, res) => {
    try {
        const aperturas = await Apertura.findAll({
            order: [['id_apertura', 'DESC']],
        });

            const aperturasFormateadas = aperturas.map(apertura => {
            const inicio = apertura.apertura_inicio instanceof Date ? formatDateTime(apertura.apertura_inicio) : apertura.apertura_inicio;
            const fin = apertura.apertura_fin instanceof Date ? formatDateTime(apertura.apertura_fin) : apertura.apertura_fin;
  
            let tipoUsuarioNombre = '';
            if (apertura.docente && apertura.auxiliar) {
                tipoUsuarioNombre = 'DOCENTE - AUXILIAR';
            } else if (apertura.docente) {
                tipoUsuarioNombre = 'DOCENTE';
            } else if (apertura.auxiliar) {
                tipoUsuarioNombre = 'AUXILIAR';
            }

            const inicioHoraMinutos = apertura.apertura_hora_inicio.slice(0, 5);
            const finHoraMinutos = apertura.apertura_hora_fin.slice(0, 5); 
            const periodo = `${formatDateTime(apertura.reserva_inicio)} ${formatDateTime(apertura.reserva_fin)}`;
            const now = new Date();

             // Estado
             let estado = '';
             if (now > apertura.apertura_fin) {
              estado = 'FINALIZADO';
             } else if (now >= apertura.apertura_inicio && now <= apertura.apertura_fin) {
              estado = 'VIGENTE';
             }

            return {
                "inicio_apertura": `${inicioHoraMinutos} ${inicio}`,
                "fin_apertura": `${finHoraMinutos} ${fin}`,
                "periodo_reservas": periodo,
                "tipo_usuario": tipoUsuarioNombre,       
                "motivo": apertura.motivo,
                "estado": estado
            };
        });

        res.json(aperturasFormateadas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const formatDateTime = (date) => {
    const formattedDate = new Date(date);
    const formattedDateString = formattedDate.toISOString().split('T')[0];
    return formattedDateString;
};
// export const getApertura = async (req, res) => {
//     try {
//         const { id_apertura } = req.params;
//         const apertura = await Apertura.findOne({ where: { id_apertura } });
//         if (!apertura) return res.status(404).json({ message: "La apertura no existe" });
//         res.json(apertura);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const getApertura = async (req, res) => {
    try {
        const { id_apertura } = req.params;
        const apertura = await Apertura.findOne({ where: { id_apertura } });

        if (!apertura) {
            return res.status(404).json({ message: "La apertura no existe" });
        }

        const inicio = new Date(apertura.apertura_inicio);
        const fin = new Date(apertura.apertura_fin);
        const reservaInicio = new Date(apertura.reserva_inicio);
        const reservaFin = new Date(apertura.reserva_fin);
        
        const inicioFormateado = inicio.toISOString().split('T')[0];
        const finFormateado = fin.toISOString().split('T')[0];
        const reservaInicioFormateado = reservaInicio.toISOString().split('T')[0];
        const reservaFinFormateado = reservaFin.toISOString().split('T')[0];

        const aperturaFormateada = {
            id_apertura: apertura.id_apertura,
            motivo: apertura.motivo,
            apertura_inicio: inicioFormateado,
            apertura_fin: finFormateado,
            apertura_hora_inicio: apertura.apertura_hora_inicio,
            apertura_hora_fin: apertura.apertura_hora_fin,
            reserva_inicio: reservaInicioFormateado,
            reserva_fin: reservaFinFormateado,
            registro_apertura: apertura.registro_apertura,
        };

        res.json(aperturaFormateada);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createApertura = async (req, res) => {
    try {
        const {
            motivo,
            apertura_inicio,
            apertura_fin,
            apertura_hora_inicio,
            apertura_hora_fin,
            reserva_inicio,
            reserva_fin,
            esDocente,
            esAuxiliar 
        } = req.body;

        const fechaInicio = new Date(`${apertura_inicio}T${apertura_hora_inicio}`);
        const fechaFin = new Date(`${apertura_fin}T${apertura_hora_fin}`);
   
        const nuevaApertura = await Apertura.create({
            motivo,
            apertura_inicio: fechaInicio,
            apertura_fin: fechaFin,
            apertura_hora_inicio,
            apertura_hora_fin,
            reserva_inicio,
            reserva_fin,
            docente : esDocente, 
            auxiliar : esAuxiliar 
        });

      
        res.status(201).json(nuevaApertura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateApertura = async (req, res) => {
    try {
        const { id_apertura } = req.params;
        const { apertura_inicio, apertura_fin, apertura_hora_inicio, apertura_hora_fin, reserva_inicio, reserva_fin } = req.body;

        const apertura = await Apertura.findByPk(id_apertura);
        apertura.apertura_inicio = apertura_inicio;
        apertura.apertura_fin = apertura_fin;
        apertura.apertura_hora_inicio = apertura_hora_inicio;
        apertura.apertura_hora_fin = apertura_hora_fin;
        apertura.reserva_inicio = reserva_inicio;
        apertura.reserva_fin = reserva_fin;

        await apertura.save();

        res.json(apertura);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteApertura = async (req, res) => {
    try {
        const { id_apertura } = req.params;
        await Apertura.destroy({ where: { id_apertura } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const aperturaPorFecha = async (req, res) => {
    try {
        const fechaActual = new Date(); 

        const aperturas = await Apertura.findAll({
            where: {
                apertura_inicio: {
                    [Op.lte]: fechaActual 
                },
                
                apertura_fin: {
                    [Op.gte]: fechaActual 
                }
            }
        });

        res.json(aperturas); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
