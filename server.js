import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // cria uma instância express
const PORT = process.env.PORT || 3336

const agendamentos = [];

app.use(express.json()) // Diz ao servidor para entender mensagens em json


app.post('/agendar', (req,res)=>{
    const {cliente, data, hora} = req.body;

    console.log("Recebido", {cliente, data, hora});

    const conflito = agendamentos.find(agendamento => agendamento.data === data && agendamento.hora === hora);

    if(conflito){
        return  res.status(400).json({message: "Conflito: Horário já agendado"});
    }

    agendamentos.push({cliente, data, hora});
    res.status(201).json({message: "Agendamento realizado com sucesso"});
})

app.get('/', (req,res)=>{
    res.send("Servidor de agendamento rodando !")
}); // primeira rota da aplicação


app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});