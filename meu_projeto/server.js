const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// CONEXÃO MYSQL

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2rc"
});


db.connect(function (err) {

  if (err) {
    console.log("ERRO MYSQL:");
    console.log(err);
    return;
  }

  console.log("MySQL conectado");

});



// ---------- SALVAR

app.post("/salvar", (req, res) => {

  const {
    tipoValvula,
    partnumber,
    faceponta,
    planicidadetopo,
    visual
  } = req.body;

  const sql =
    "INSERT INTO aprovacoes (tipoValvula, partnumber, faceponta, planicidadetopo, visual) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [tipoValvula, partnumber, faceponta, planicidadetopo, visual],
    function (err, result) {

      if (err) {
        console.log("ERRO INSERT");
        console.log(err);
        res.send("erro");
        return;
      }

      res.send("ok");

    }
  );

});



// ---------- BUSCAR DADOS

app.get("/dados", (req, res) => {

  const sql = "SELECT * FROM aprovacoes";

  db.query(sql, function (err, result) {

    if (err) {
      console.log("ERRO SELECT");
      console.log(err);
      res.json([]);
      return;
    }

    res.json(result);

  });

});



// ---------- SERVIDOR

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});