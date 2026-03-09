const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2rc",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

app.post("/salvar", (req, res) => {
  const { tipoValvula, partnumber, faceponta, planicidadetopo, visual } = req.body;

  const sql = `
    INSERT INTO aprovacoes 
    (tipoValvula, partnumber, faceponta, planicidadetopo, visual)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [tipoValvula, partnumber, faceponta, planicidadetopo, visual],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Erro ao salvar");
      } else {
        res.send("Salvo com sucesso");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
