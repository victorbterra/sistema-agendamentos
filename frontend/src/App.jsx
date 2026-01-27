import './App.css';
import { useEffect, useState } from 'react';
import AgendamentoForm from './components/AgendamentoForm';
import api from './services/api';



function App() {
  const [agendamentos, setAgendamentos] = useState([]);

  const carregarAgendamentos = async () => {
    try {
      const res = await api.get('/agendamentos');
      setAgendamentos(res.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await api.delete(`/agendamentos/${id}`);
        alert("Agendamento cancelado com sucesso!");
        carregarAgendamentos();
      } catch (error) {
        alert("Erro ao cancelar agendamento.");
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await carregarAgendamentos();
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Front do sistema de agendamento online !</h1>
        <h2>Minha Agenda</h2>
        <ul>
          {
            agendamentos.map((agendamento) => (
              <li key={agendamento.id}>
                {agendamento.cliente} - {agendamento.data} - {agendamento.hora}
                <button onClick={() => handleDelete(agendamento.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  Cancelar
                </button>
              </li>
            ))
          }
        </ul>
        <AgendamentoForm aoAtualizar={carregarAgendamentos}/>
      </div>
    </>
  )
}
export default App
