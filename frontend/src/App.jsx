import "./App.css";
import api from "./services/api";
import { useEffect, useState } from "react";
import AcessibilidadeWidget from "./components/AcessibilidadeWidget";
import Modal from "./components/Modal";
import AgendamentoForm from "./components/AgendamentoForm";

function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const aoSalvarComSucesso = () => {
    carregarAgendamentos();
    setModalAberto(false); // Fecha o modal automaticamente!
  };

  const carregarAgendamentos = async () => {
    try {
      const res = await api.get("/agendamentos");
      setAgendamentos(res.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await api.delete(`/agendamentos/${id}`);
        alert("Agendamento cancelado com sucesso!");
        carregarAgendamentos();
      } catch (error) {
        alert("Erro ao cancelar agendamento.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await carregarAgendamentos();
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 h-full">
      <header className="mb-6 border-b-slate-300 border-b flex justify-between items-center pb-4">
        <h1 className="text-2xl xl:text-3xl font-bold">
          Sistema de Agendamentos
        </h1>
      </header>

      <main className="grid gap-6">
        {/* Lista de agendamentos */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-600">
              Clientes Agendados
            </h2>
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-teal-200 transition-all flex items-center gap-2 transform hover:scale-105"
              >
                +
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {agendamentos.map((a) => (
              <div
                key={a.id}
                className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between hover:border-teal-200 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                {/* Detalhe lateral sutil */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                      Cliente
                    </p>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">
                      {a.cliente}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-slate-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
                    title="Cancelar consulta"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-sm">
                    <span>📅</span>
                    <span className="font-medium">{a.data}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100 text-sm">
                    <span>⏰</span>
                    <span className="font-bold">{a.hora}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Conteúdo do modal para criar novo agendamento */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AgendamentoForm onSuccess={aoSalvarComSucesso} />
      </Modal>
      <AcessibilidadeWidget />
    </div>
  );
}
export default App;
