import { useState } from "react";
import api from "../services/api";

const AgendamentoForm = ({ aoAtualizar }) => {
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Lógica para enviar os dados do agendamento para o backend
    try {
      await api.post("/agendar", { cliente, data, hora });
      alert("Agendamento realizado com sucesso!");

      setCliente("");
      setData("");
      setHora("");

      aoAtualizar();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao realizar agendamento.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </form>
    </div>
  );
};

export default AgendamentoForm;
