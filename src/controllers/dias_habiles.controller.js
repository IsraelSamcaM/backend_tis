import { Dia_habil } from '../models/Dia_habil.js';

export const getDiasHabiles = async (req, res) => {
    try {
        const diasHabiles = await Dia_habil.findAll();
        res.json(diasHabiles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDiaHabil = async (req, res) => {
    try {
        const { id_dia_habil } = req.params;
        const diaHabil = await Dia_habil.findOne({ where: { id_dia_habil } });
        if (!diaHabil) return res.status(404).json({ message: "El día hábil no existe" });
        res.json(diaHabil);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createDiaHabil = async (req, res) => {
    const { dia, hora_inicio, hora_fin } = req.body;
    try {
        const newDiaHabil = await Dia_habil.create({ dia, hora_inicio, hora_fin });
        res.json(newDiaHabil);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDiaHabil = async (req, res) => {
    try {
        const { id_dia_habil } = req.params;
        const { dia, hora_inicio, hora_fin } = req.body;

        const diaHabil = await Dia_habil.findByPk(id_dia_habil);
        diaHabil.dia = dia;
        diaHabil.hora_inicio = hora_inicio;
        diaHabil.hora_fin = hora_fin;

        await diaHabil.save();

        res.json(diaHabil);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteDiaHabil = async (req, res) => {
    try {
        const { id_dia_habil } = req.params;
        await Dia_habil.destroy({ where: { id_dia_habil } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
