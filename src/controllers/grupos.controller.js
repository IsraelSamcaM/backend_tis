import { Grupo } from '../models/Grupo.js';

export const getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll();
        res.json(grupos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getGrupo = async (req, res) => {
    try {
        const { id_grupo } = req.params;
        const grupo = await Grupo.findOne({ where: { id_grupo } });
        res.json(grupo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createGrupo = async (req, res) => {
    const { nombre_grupo, cantidad_est, materia_id, usuario_id } = req.body;
    try {
        const newGrupo = await Grupo.create({ nombre_grupo, cantidad_est,materia_id, usuario_id  });
        res.json(newGrupo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateGrupo = async (req, res) => {
    try {
        const { id_grupo } = req.params;

        const grupo = await Grupo.findOne(id_grupo);
        grupo.set(req.body)
        await grupo.save();
        res.json(grupo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteGrupo = async (req, res) => {
    try {
        const { id_grupo } = req.params;
        await Grupo.destroy({ where: { id_grupo } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
