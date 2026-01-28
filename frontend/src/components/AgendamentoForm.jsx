import { useState, useEffect } from "react";
import api from "../services/api";

const AgendamentoForm = ({ aoAtualizar }) => {
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Se não tiver erro, não faz nada
    if (!erro) return;

    // Cria o timer para limpar o erro após 5000ms (5 segundos)
    const timer = setTimeout(() => {
      setErro('');
    }, 5000);

    // Função de limpeza: Se o usuário gerar outro erro antes dos 5s,
    // ou fechar o modal, nós cancelamos o timer anterior para não dar bug.
    return () => clearTimeout(timer);
    }, [erro]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(loading) return;

    setLoading(true);
    setErro("");
    // Lógica para enviar os dados do agendamento para o backend
    try {
      await api.post("/agendar", { cliente, data, hora });

      alert("Agendamento realizado com sucesso!");

      setCliente("");
      setData("");
      setHora("");

      if(aoAtualizar) aoAtualizar();
    } catch (error) {                                               
      console.error("Erro ao criar agendamento:", error);

      const msg = error.response?.data?.erro || "Este horário já está reservado para outro cliente. Por favor, escolha outro"
      setErro(msg);

      if (error.response?.status === 400) {
          setHora('')
      }
    } finally { 
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Campo de nome */}
        <div>
          <label className="text-gray-500">Nome</label>
          <input
              className="w-full border border-gray-300 rounded-2xl px-3 py-2"
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>
        {/* Campos de data e hora */}
        <div className="flex flex-row gap-4 mt-2">
          <div>
          <label className="text-gray-500">Data</label>
          <input
            className="w-full border border-gray-300 rounded-2xl px-3 p-2"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          </div>
          <div>
            <label className="text-gray-500">Hora</label>
            <input
              className="w-full border border-gray-300 rounded-2xl px-3 py-2"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
        </div>
        {erro && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mt-3 border border-red-200">
              ⚠️ {
              erro
              }
          </div>
        )}
        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 disabled:opacity-50" 
          type="submit" 
          disabled={loading}>
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </form>
    </div>
  );
};

export default AgendamentoForm;
