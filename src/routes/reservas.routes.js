import { Router } from "express";
import { getTablaDisponibles, createReserva} from '../controllers/reservas.controller.js';

const router = Router();

router.post('/', getTablaDisponibles);
router.post('/crear/', createReserva);


export default router;
