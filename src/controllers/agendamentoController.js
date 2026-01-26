import {criarAgendamento, listarAgendamentos} from '../services/agendamentoService.js';


async function store(req, res) {
    const {cliente, data, hora} = req.body;

    try{
        const novoAgendamento = await criarAgendamento(cliente, data, hora);
        res.status(201).json(novoAgendamento);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

async function getAll(req, res) {

    const {data} = req.query;
    try {
        const agendamentos = await listarAgendamentos(data);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {store, getAll};