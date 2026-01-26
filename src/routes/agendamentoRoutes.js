import express from 'express';
import {store, getAll} from '../controllers/agendamentoController.js';


const router = express.Router();


router.post('/agendar', store);
router.get('/agendamentos', getAll);

export default router;