import { Router } from "express";
import { createMateria, getMateria, deleteMateria, updateMateria, getMaterias,cargarMaterias } from '../controllers/materias.controller.js';

const router = Router();

router.get('/', getMaterias);
router.post('/', createMateria);
router.put('/:id_materia', updateMateria);
router.delete('/:id_materia', deleteMateria);
router.get('/:id_materia', getMateria);



router.post('/:id_usuario/cargarmaterias', cargarMaterias);


export default router;
