const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { createConnection } = require("net");
const app = express();

//Permitir receber os dados do fetch

app.use(cors());
app.use(express.json());

//Criar conexão com o banco de dados
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "", //Vazio padrão do XAMPP
  database: "2rc", //banco de dados usado no MySQL
  port: 3306, //Porta usada (MySQL 3306)
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

//Criar um servidor na porta 3000 (Node)
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
