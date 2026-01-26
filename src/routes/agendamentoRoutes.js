import express from 'express';
import store from '../controllers/agendamentoController.js';


const router = express.Router();


router.post('/agendar', store);

export default router;