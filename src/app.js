const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()) // Para conteúdo do tipo JSON

const MONGODB_URI= process.env.CONNECTION_STRING
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!')
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados: ', err.message)
  });

const Usuario= require('./models/Usuario');
const Mensagem = require('./models/Mensagem');

const userRoute = require('./routes/userRoute');
const mensagemRoute= require('./routes/mensagemRoute');

app.use('/auth', userRoute);
app.use('/', mensagemRoute);

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});