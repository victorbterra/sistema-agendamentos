import prisma from '../lib/prisma.js';

export default async function criarAgendamento(cliente, data, hora) {
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