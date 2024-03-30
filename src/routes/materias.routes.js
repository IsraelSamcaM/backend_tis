import { Router } from "express";
import { createMateria, getMateria, deleteMateria, updateMateria, getMaterias,uploadExcel } from '../controllers/materias.controller.js';

import multer from 'multer'; 
const upload = multer();

const router = Router();

router.get('/', getMaterias);
router.post('/', createMateria);
router.post('/subirexcel', upload.single('file'), uploadExcel);
router.get('/:id_materia/', getMateria);
router.put('/:id_materia', updateMateria);
router.delete('/:id_materia', deleteMateria);



export default router;
