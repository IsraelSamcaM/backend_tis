import { Apertura } from '../models/Apertura.js';

export const getAperturas = async (req, res) => {
    try {
        const aperturas = await Apertura.findAll();
        res.json(aperturas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getApertura = async (req, res) => {
    try {
        const { id_apertura } = req.params;
        const apertura = await Apertura.findOne({ where: { id_apertura } });
        if (!apertura) return res.status(404).json({ message: "La apertura no existe" });
        res.json(apertura);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createApertura = async (req, res) => {
    const { apertura_inicio, apertura_fin, reserva_inicio, reserva_fin } = req.body;
    try {
        const newApertura = await Apertura.create({ apertura_inicio, apertura_fin, reserva_inicio, reserva_fin });
        res.json(newApertura);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateApertura = async (req, res) => {
    try {
        const { id_apertura } = req.params;
        const { apertura_inicio, apertura_fin, reserva_inicio, reserva_fin } = req.body;

        const apertura = await Apertura.findByPk(id_apertura);
        apertura.apertura_inicio = apertura_inicio;
        apertura.apertura_fin = apertura_fin;
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
