import { Usuario } from '../models/Usuario.js';
import { Grupo } from '../models/Grupo.js'; // Asegúrate de importar el modelo de Grupo si lo necesitas
import { Materia } from '../models/Materia.js';
import { Aux_grupo } from '../models/Aux_grupos.js';

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

// export const getMateriasGrupos = async (req, res) => {
//     const { id_usuario } = req.params;

//     try {
//         const gruposUsuario = await Grupo.findAll({
//             where: { usuario_id: id_usuario },
//             include: [
//                 {
//                     model: Materia,
//                     attributes: ['nombre_materia']
//                 }
//             ],
//             attributes: ['id_grupo', 'nombre_grupo', 'materia.nombre_materia']
//         });

//         if (!gruposUsuario || gruposUsuario.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado o no tiene grupos asociados' });
//         }

//         const gruposConMateria = gruposUsuario.map(grupo => ({
//             id_grupo: grupo.id_grupo,
//             nombre_grupo: grupo.nombre_grupo,
//             nombre_materia: grupo.materia ? grupo.materia.nombre_materia : null
//         }));

//         res.json(gruposConMateria);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


export const getMateriasGrupos = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const usuario = await Usuario.findOne({
            where: { id_usuario },
            attributes: ['id_usuario', 'nombre_usuario', 'contrasenia_usuario', 'email_usuario', 'tipo_usuario', 'codsiss', 'disponible'],
            include: [{
                model: Aux_grupo,
                include: [{
                    model: Grupo,
                    include: [{
                        model: Materia,
                        attributes: ['nombre_materia']
                    }],
                    attributes: ['id_grupo', 'nombre_grupo', 'cantidad_est'],
                }],
                attributes: ['id_aux_grupo']
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const gruposConMateria = usuario.aux_grupos.map(auxGrupo => ({
            id_aux_grupo: auxGrupo.id_aux_grupo,
            id_grupo: auxGrupo.grupo.id_grupo,
            nombre_grupo: auxGrupo.grupo.nombre_grupo,
            nombre_materia: auxGrupo.grupo.materia ? auxGrupo.grupo.materia.nombre_materia : null,
            cantidad_est: auxGrupo.grupo.cantidad_est
        }));

        res.json({
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            contrasenia_usuario: usuario.contrasenia_usuario,
            email_usuario: usuario.email_usuario,
            tipo_usuario: usuario.tipo_usuario,
            codsiss: usuario.codsiss,
            disponible: usuario.disponible,
            'materia-grupo': gruposConMateria
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

  