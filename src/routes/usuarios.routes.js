import { Router } from "express";
import { createUsuario, getUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id_usuario', getUsuario);
router.post('/', createUsuario);
router.put('/:id_usuario', updateUsuario);
router.delete('/:id_usuario', deleteUsuario);

router.delete('/:id_usuario/grupos', getUsuarioGrupo);

export default router;
