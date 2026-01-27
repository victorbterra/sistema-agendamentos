import express from 'express';
import {agendar, listar, cancelar, remarcar} from '../controllers/agendamentoController.js';


const router = express.Router();


router.post('/agendar', agendar);
router.get('/agendamentos', listar);
router.delete('/agendamentos/:id', cancelar);
router.put('/agendamentos/:id', remarcar);

export default router;