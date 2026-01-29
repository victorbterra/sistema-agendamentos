import express from 'express';
import cors from 'cors';
import agendamentoRoutes from './src/routes/agendamentoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3337;

app.use(express.json());

app.use(agendamentoRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} http://localhost:${PORT}`);
});