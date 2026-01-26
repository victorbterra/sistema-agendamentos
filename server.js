import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // cria uma instância express
const PORT = process.env.PORT || 3336

const prisma = new PrismaClient(); // cria uma instância do Prisma Client   



app.use(express.json()) // Diz ao servidor para entender mensagens em json


app.post('/agendar',async (req,res)=>{
    const {cliente, data, hora} = req.body;

    try{
        // Verificação de conflito de agendamento
        const conflito = await prisma.Agendamento.findFirst({
            where:{
                data,
                hora
            }
        });
        if(conflito){
            return  res.status(400).json({message: "Conflito: Horário já agendado"});
        }
        // Criação do agendamento
        const novoAgendamento = await prisma.Agendamento.create({
            data:{
                cliente,
                data,
                hora
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Erro interno no servidor"});
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