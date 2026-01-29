import { useState } from "react";
import api from "../services/api";

export default function RegisterPage({ aoSucesso }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("/registrar", { nome, email, senha });
      setSucesso("Registro realizado com sucesso! Você já pode fazer login.");
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
      setTimeout(() => {
        aoSucesso();
      }, 2000);
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao criar conta.");
    }

    if (sucesso) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="text-center animate-bounce">
            <span className="text-6xl">🎉</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              Conta criada!
            </h2>
            <p className="text-slate-500">Redirecionando para o login...</p>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
          Criar Conta
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Junte-se ao nosso sistema de agendamentos!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Nome Completo"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirme a Senha"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          {erro && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              {erro}
            </p>
          )}

          <button className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all">
            Cadastrar agora
          </button>

          <button
            type="button"
            onClick={aoSucesso}
            className="w-full text-slate-500 text-sm hover:underline"
          >
            Já tem uma conta? Faça login
          </button>
        </form>
      </div>
    </div>
  );
}
