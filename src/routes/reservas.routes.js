import { Router } from "express";
import { getTablaDisponibles, createReserva, getListaReservas,getListaReservasUsuario} from '../controllers/reservas.controller.js';

const router = Router();

router.get('/lista_reservas', getListaReservas);
router.get('/reserva-usuario/:id_usuario', getListaReservasUsuario);

router.post('/', getTablaDisponibles);
router.post('/crear/', createReserva);


export default router;
