import { Grupo } from '../models/Grupo.js';
import { Materia } from '../models/Materia.js';

export const getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll();
        res.json(grupos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTablaMaterias = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({
            include: {
                model: Materia
            }
        });

        const gruposFormateados = grupos.map((grupo, index) => ({
            numero: index+1,
            id_grupo: grupo.id_grupo,
            nombre_grupo: grupo.nombre_grupo,
            docente: grupo.docente,
            cantidad_est: grupo.cantidad_est,
            usuario_id: grupo.usuario_id,
            materia_id: grupo.materia_id,
            nombre_materia: grupo.materia.nombre_materia, 
            nivel_materia: grupo.materia.nivel_materia

        }));
        res.json(gruposFormateados);
    } catch (error){
        return res.status(500).json({message: error.message });
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
