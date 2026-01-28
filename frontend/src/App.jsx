import './App.css';
import api from './services/api';
import { useEffect, useState } from 'react';
import AcessibilidadeWidget from './components/AcessibilidadeWidget';
import Modal from './components/Modal';
import AgendamentoForm from './components/AgendamentoForm';

function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const aoSalvarComSucesso = () => {
    carregarAgendamentos()
    setModalAberto(false) // Fecha o modal automaticamente!
  }

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
    <div className="max-w-4xl mx-auto p-4 h-full">
      <header className="mb-6 border-b-slate-300 border-b flex justify-between items-center pb-4">
        <h1 className="text-2xl xl:text-3xl font-bold">Sistema de Agendamentos</h1>
      </header>

      <main className="grid md:grid-cols-2 gap-6">
        {/* Lista de agendamentos */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-600">Clientes Agendados</h2>
            <div>
            <button 
            onClick={() => setIsOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-teal-200 transition-all flex items-center gap-2 transform hover:scale-105"
            >
            +
            </button>
          </div>
          </div>

          <ul className="space-y-3 h-full overflow-y-auto">
            {
              agendamentos.length === 0 && (
                <li className="text-slate-500">Nenhum agendamento encontrado.</li>
              )
            }
            {
              agendamentos.map((agendamento)=> (
                <li key={agendamento.id} className="bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex flex-col justify-between mb-2 gap-3">
                    <span className="text-lg md:text-xl text-slate-800">{agendamento.cliente}</span>
                    <div className="flex md:flex-row md:items-center gap-6">
                        <span className="text-sm text-slate-500">📅 {agendamento.data}</span>
                      <span className="text-sm text-slate-500">⏰ {agendamento.hora}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(agendamento.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Cancelar Agendamento
                  </button>
                </li>
              ))
            }
          </ul>
        </section>
      </main>
      {/* Conteúdo do modal para criar novo agendamento */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AgendamentoForm onSuccess={aoSalvarComSucesso} />
      </Modal>
      <AcessibilidadeWidget />
    </div>
  )
}
export default App
