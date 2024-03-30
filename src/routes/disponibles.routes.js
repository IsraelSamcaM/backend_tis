import { Router } from "express";
import { disponibilidadPorAmbiente} from '../controllers/disponibles.controller.js'

const router = Router();

router.get('/ambiente/:id_ambiente', disponibilidadPorAmbiente)

export default router