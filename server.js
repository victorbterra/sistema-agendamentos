import express from 'express';
import agendamentoRoutes from './src/routes/agendamentoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3337;

app.use(express.json());

app.use(agendamentoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} http://localhost:${PORT}`);
});