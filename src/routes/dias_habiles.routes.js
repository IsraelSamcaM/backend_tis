import { Router } from "express";
import { createDiaHabil, getDiaHabil, deleteDiaHabil, updateDiaHabil, getDiasHabiles } from '../controllers/dias_habiles.controller.js';

const router = Router();

router.get('/', getDiasHabiles);
router.post('/', createDiaHabil);
router.put('/:id_dia_habil', updateDiaHabil);
router.delete('/:id_dia_habil', deleteDiaHabil);
router.get('/:id_dia_habil', getDiaHabil);

export default router;
