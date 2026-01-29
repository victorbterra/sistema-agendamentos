import { criarUsuario } from "../services/userService.js";
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import { gerarToken } from "../utils/auth.js";

const prisma = new PrismaClient();


async function registrar(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if(!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    try{
        const novoUsuario = await criarUsuario(nome, email, senha);

        // Retirar a senha do objeto antes de enviar a resposta
        const {senha:_, ...usuarioSemSenha} = novoUsuario;

        return res.status(201).json({
            mensagem: 'Usuário registrado com sucesso.',
            usuario: usuarioSemSenha
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(400).json({
            erro: error.message
        });
    }
}

async function login(req, res){
    const email = req.body.email;
    const senha = req.body.senha;

    // Verificar se email e senha foram fornecidos
    if(!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    try{
        // 1 Debug: Usuário existe?
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });

        if(!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        // 2 Debug: Senha bate com o hash?
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        // 3 Debug: Gera o Token
        const token = gerarToken(usuario.id);

        // Retirar a senha do objeto antes de enviar a resposta
        const {senha:_, ...usuarioSemSenha} = usuario;

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso.',
            usuario: usuarioSemSenha,
            token: token
        });
    }catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export { registrar, login };