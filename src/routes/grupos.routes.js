import { Router } from "express";
import { createGrupo, getGrupo, deleteGrupo, updateGrupo, getGrupos, getTablaMaterias } from '../controllers/grupos.controller.js';

const router = Router();

router.get('/', getGrupos);
router.get('/tablamaterias/', getTablaMaterias);

router.post('/', createGrupo);
router.put('/:id_grupo', updateGrupo);
router.delete('/:id_grupo', deleteGrupo);
router.get('/:id_grupo', getGrupo);


export default router;
