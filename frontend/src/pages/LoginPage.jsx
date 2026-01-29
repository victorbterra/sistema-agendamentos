import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage({ onAlternar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await login(email, senha);
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro no login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
          Sistema de Agendamento <span className="text-teal-600">Pro</span>
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Acesse sua conta para gerenciar seus agendamentos
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 italic">
              {erro}
            </p>
          )}

          <button className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-100">
            Entrar no Sistema
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Não tem uma conta?{" "}
            <button
              onClick={onAlternar}
              type="button"
              className="text-teal-600 font-bold hover:underline ml-1"
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
