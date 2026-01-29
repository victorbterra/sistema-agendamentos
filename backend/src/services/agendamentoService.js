import prisma from "../lib/prisma.js";

async function index(req, res) {
  const { data } = req.query;
  try {
    const agendamentos = await listarAgendamentos(data);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
}

async function criarAgendamento(cliente, data, hora) {
  const conflito = await prisma.Agendamento.findFirst({
    where: {
      data,
      hora,
      usuarioId:req.usuarioId
    },
  });

  if (conflito) {
    throw new Error("Conflito: Horário já agendado");
  }

  return await prisma.Agendamento.create({
    data: {
      cliente,
      data,
      hora,
      usuarioId:req.usuarioId
    },
  });
}

async function listarAgendamentos(dataFiltro) {
  const onde = dataFiltro ? { data: dataFiltro, usuarioId:req.usuarioId } : {};

  return await prisma.Agendamento.findMany({
    where: onde,
    orderBy: { hora: "asc" },
  });
}

async function cancelarAgendamento(id) {
  return await prisma.Agendamento.delete({
    where: { id },
  });
}

async function remarcarAgendamento(id, novaData, novaHora) {
  const conflito = await prisma.Agendamento.findFirst({
    where: {
      data: novaData,
      hora: novaHora,
      NOT: { id: Number(id) }
    },
  });

  if (conflito) {
    throw new Error("Conflito: Horário já agendado");
  }

  return await prisma.Agendamento.update({
    where: { id: Number(id) },
    data: {
      data: novaData,
      hora: novaHora,
    }
  });
}

export {
  criarAgendamento,
  listarAgendamentos,
  cancelarAgendamento,
  remarcarAgendamento,
};
