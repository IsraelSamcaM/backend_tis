import { Router } from "express";
import { createApertura, getApertura, deleteApertura, updateApertura, getAperturas,getAperturasTabla } from '../controllers/aperturas.controller.js';

const router = Router();

router.get('/', getAperturas);
router.get('/tabla-aperturas', getAperturasTabla);
router.post('/', createApertura);
router.put('/:id_apertura', updateApertura);
router.delete('/:id_apertura', deleteApertura);
router.get('/:id_apertura', getApertura);

export default router;
