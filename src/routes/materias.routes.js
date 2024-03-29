import { Router } from "express";
import { createMateria, getMateria, deleteMateria, updateMateria, getMaterias,uploadExcel } from '../controllers/materias.controller.js';

const router = Router();

router.get('/', getMaterias);
router.post('/', createMateria);
router.post('/subirexcel', uploadExcel);
router.get('/:id_materia/', getMateria);
router.put('/:id_materia', updateMateria);
router.delete('/:id_materia', deleteMateria);



export default router;
