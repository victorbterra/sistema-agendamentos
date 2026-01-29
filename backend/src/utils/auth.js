import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

// Gera um token JWT para o usuário autenticado
const gerarToken = (usuarioID) => {
    return jwt.sign(
        {id: usuarioID},
        SECRET_KEY,
        {expiresIn: process.env.TOKEN_EXPIRATION}
    )
};


// Verifica se um token é valido e retorna os dados decodificados
const verificarToken = (token) => {
    try{
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return null;
    }
};


export {gerarToken, verificarToken};