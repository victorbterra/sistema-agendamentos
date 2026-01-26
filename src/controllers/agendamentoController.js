import criarAgendamento from '../services/agendamentoService.js';


export default async function store(req, res) {
    const {cliente, data, hora} = req.body;

    try{
        const novoAgendamento = await criarAgendamento(cliente, data, hora);
        res.status(201).json(novoAgendamento);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};