import express from 'express';
import {agendar, listar, cancelar} from '../controllers/agendamentoController.js';


const router = express.Router();


router.post('/agendar', agendar);
router.get('/agendamentos', listar);
router.delete('/agendamentos/:id', cancelar);

export default router;