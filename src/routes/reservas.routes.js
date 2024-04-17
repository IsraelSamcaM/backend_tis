import { Router } from "express";
import { getReservas,} from '../controllers/reservas.controller.js';

const router = Router();

router.post('/', getReservas);


export default router;
