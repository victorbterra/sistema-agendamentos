import { createContext,useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenSalvo = localStorage.getItem("token");
        const usuarioSalvo = localStorage.getItem("usuario");
        
        if (tokenSalvo && usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenSalvo}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, senha) => {
    try {
        const response = await api.post("/login", { email, senha });
        const { usuario: usuarioLogado, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUsuario(usuarioLogado);
        return { sucesso: true };
    } catch (error) {
        console.error("Erro no login:", error);
        return { sucesso: false, mensagem: error.response?.data?.erro || "Erro no login" };
    }
    }

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    delete api.defaults.headers.common["Authorization"];
    setUsuario(null);
    }

    return (
    <AuthContext.Provider value={{ logado: !!usuario, usuario, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);