import {verificarToken} from '../utils/auth.js';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token de autenticação não fornecido.' });
    }

    const partes = authHeader.split(' ');

    if(partes.length !== 2){
        return res.status(401).json({ erro: 'Formato de token inválido.' });
    }

    const [esquema, token] = partes;

    if (!/^Bearer$/i.test(esquema)) {
        return res.status(401).json({ erro: 'Token mal formatado.' });
    }

    const decodificado = verificarToken(token);

    if (!decodificado) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }

    req.usuarioID = decodificado.id;


    next();
}