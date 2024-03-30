import { Router } from "express";
import {createAmbiente,getAmbiente,deleteAmbiente,updateAmbiente, getAmbientes} from '../controllers/ambientes.controller.js'

const router = Router();

router.get('/', getAmbientes)
router.post('/', createAmbiente)

//router.post('/:tipo_ambiente/grupo/:id_grupo/fecha/:fecha', createAmbiente)
//PENSAR QUE SOPORTE LA FECHA

router.put('/:id_ambiente',updateAmbiente)
router.delete('/:id_ambiente',deleteAmbiente)
router.get('/:id_ambiente',getAmbiente)

export default router