import { Router } from "express";
import { getTablaDisponibles, createReserva, getListaReservas,getListaReservasUsuario,reporteDocentes} from '../controllers/reservas.controller.js';

const router = Router();

router.get('/lista_reservas', getListaReservas);
router.get('/reserva-usuario/:id_usuario', getListaReservasUsuario);

router.post('/', getTablaDisponibles);
router.post('/crear/', createReserva);
router.post('/reporte-docentes', reporteDocentes);


export default router;
