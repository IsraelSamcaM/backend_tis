import { Router } from "express";
import { getReservas, getListaReservas } from '../controllers/reservas.controller.js';

const router = Router();

router.get('/lista_reservas', getListaReservas);
router.post('/', getReservas);


export default router;
