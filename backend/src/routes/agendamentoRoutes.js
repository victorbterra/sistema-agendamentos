import express from 'express';
import {agendar, listar, cancelar, remarcar} from '../controllers/agendamentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/agendar', authMiddleware, agendar);
router.get('/agendamentos', authMiddleware, listar);
router.delete('/agendamentos/:id', authMiddleware, cancelar);
router.put('/agendamentos/:id', authMiddleware, remarcar);

export default router;