import { Materia } from '../models/Materia.js';

export const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll();
        res.json(materias);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        const materia = await Materia.findOne({ where: { id_materia } });
        if (!materia) return res.status(404).json({ message: "La materia no existe" });
        res.json(materia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createMateria = async (req, res) => {
    const { nombre_materia, nivel_materia } = req.body;
    try {
        const newMateria = await Materia.create({ nombre_materia, nivel_materia });
        res.json(newMateria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        const { nombre_materia, nivel_materia } = req.body;

        const materia = await Materia.findByPk(id_materia);
        materia.nombre_materia = nombre_materia;
        materia.nivel_materia = nivel_materia;

        await materia.save();

        res.json(materia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        await Materia.destroy({ where: { id_materia } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
