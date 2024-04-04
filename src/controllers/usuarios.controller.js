import { Usuario } from '../models/Usuario.js';
import { Grupo } from '../models/Grupo.js'; // Asegúrate de importar el modelo de Grupo si lo necesitas
import { Materia } from '../models/Materia.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await Usuario.findOne({ where: { id_usuario } });
        if (!usuario) return res.status(404).json({ message: "El usuario no existe" });
        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createUsuario = async (req, res) => {
    const { nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario, codsiss } = req.body;
    try {
        const newUsuario = await Usuario.create({ nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario, codsiss });
        res.json(newUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario, codsiss } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) return res.status(404).json({ message: "El usuario no existe" });

        usuario.nombre_usuario = nombre_usuario;
        usuario.contrasenia_usuario = contrasenia_usuario;
        usuario.email_usuario = email_usuario;
        usuario.tipo_usuario = tipo_usuario;
        usuario.codsiss = codsiss;

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        await Usuario.destroy({ where: { id_usuario } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getUsuarioGrupo = async (req, res) =>{
    const {id_usuario} = req.params
    const grupos = await Grupo.findAll({where:{usuario_id: id_usuario}})
    res.json(grupos)
}

export const getMateriasGrupos = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const gruposUsuario = await Grupo.findAll({
            where: { usuario_id: id_usuario },
            include: [
                {
                    model: Materia,
                    attributes: ['nombre_materia']
                }
            ],
            attributes: ['nombre_grupo']
        });

        if (!gruposUsuario || gruposUsuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o no tiene grupos asociados' });
        }

        res.json(gruposUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


  