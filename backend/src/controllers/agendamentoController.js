import {criarAgendamento, listarAgendamentos, cancelarAgendamento, remarcarAgendamento} from '../services/agendamentoService.js';


async function agendar(req, res) {
    const cliente = req.body.cliente;
    const data = req.body.data;
    const hora = req.body.hora;

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
    const id = req.params.id;

    try {
        await cancelarAgendamento(parseInt(id));
        res.status(204).send({message: "Agendamento cancelado com sucesso."});
    } catch (error) {
        res.status(500).json({ error: "Não foi possível cancelar: agendamento não encontrado." });
    }
}

async function remarcar(req, res) {
    //pegar o id
    const id = req.params.id;

    //pegar a nova data e hora
    const novaData = req.body.data;
    const novaHora = req.body.hora;

    //chamar o serviço de remarcar
    try {
        const atualizado = await remarcarAgendamento(id, novaData, novaHora);
        res.status(200).json(atualizado);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {agendar, listar, cancelar, remarcar};