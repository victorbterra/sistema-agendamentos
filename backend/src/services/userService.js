import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function criarUsuario(nome, email, senha){

    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    });

    if (usuarioExistente) {
        throw new Error('já existe um usuário com este email.');
    }
    //debug 1: Verifica se o usuário existente foi encontrado
    console.log('Criando usuário:', { nome, email });

    // debug 2: Verifica a senha antes de hashear
    const hashSenha = await bcrypt.hash(senha, 10);

    //criar usuario no banco
    const novoUsuario = await prisma.usuario.create({
        data:{
            nome,
            email,
            senha: hashSenha,
        }
    });
    return novoUsuario;
}

export {criarUsuario};