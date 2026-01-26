import {criarAgendamento, listarAgendamentos, cancelarAgendamento} from '../services/agendamentoService.js';


async function agendar(req, res) {
    const {cliente, data, hora} = req.body;

    try{
        const novoAgendamento = await criarAgendamento(cliente, data, hora);
        res.status(201).json(novoAgendamento);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

async function listar(req, res) {

    const {data} = req.query;
    try {
        const agendamentos = await listarAgendamentos(data);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cancelar(req, res) {
    const { id } = req.params;

    try {
        await cancelarAgendamento(parseInt(id));
        res.status(204).send({message: "Agendamento cancelado com sucesso."});
    } catch (error) {
        res.status(500).json({ error: "Não foi possível cancelar: agendamento não encontrado." });
    }
}

export {agendar, listar, cancelar};