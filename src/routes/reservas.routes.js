import { Router } from "express";
import { getTablaDisponibles, createReserva, getListaReservas} from '../controllers/reservas.controller.js';

const router = Router();

router.get('/lista_reservas', getListaReservas);

router.post('/', getTablaDisponibles);
router.post('/crear/', createReserva);


export default router;
