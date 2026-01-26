import prisma from '../lib/prisma.js';

async function criarAgendamento(cliente, data, hora) {
    const conflito = await prisma.Agendamento.findFirst({
        where: {
            data,
            hora
        }
    });

    if (conflito) {
        throw new Error("Conflito: Horário já agendado");
    }

    return await prisma.Agendamento.create({
        data: {
            cliente,
            data,
            hora
        }
    })
}

async function listarAgendamentos(dataFiltro) {
    const onde = dataFiltro ? { data: dataFiltro } : {};
    
    return await prisma.Agendamento.findMany({
        where: onde,
        orderBy: { hora: 'asc'}
    });
}

async function index (req, res) {
    const { data } = req.query;
    try {
        const agendamentos = await listarAgendamentos(data);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
}

export {criarAgendamento, listarAgendamentos, index};