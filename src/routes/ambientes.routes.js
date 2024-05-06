import { Router } from "express";
import {createAmbiente,getAmbiente,deleteAmbiente,updateAmbiente, getAmbientes,createAmbienteCompleto,editarAmbienteCompleto} from '../controllers/ambientes.controller.js'

const router = Router();

router.get('/', getAmbientes)
router.post('/', createAmbiente)
router.post('/completo',createAmbienteCompleto)

//router.post('/:tipo_ambiente/grupo/:id_grupo/fecha/:fecha', createAmbiente)
//PENSAR QUE SOPORTE LA FECHA


router.put('/:id_ambiente',updateAmbiente)
router.post('/editar-completo',editarAmbienteCompleto)
router.delete('/:id_ambiente',deleteAmbiente)
router.get('/:id_ambiente',getAmbiente)




export default router