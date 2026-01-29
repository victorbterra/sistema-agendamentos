import { criarUsuario } from "../services/userService.js";


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


export { registrar };