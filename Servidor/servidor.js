const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "calculadora",
});

app.use(cors({
  origin: 'http://localhost:3000' // Reemplaza esto con tu origen específico
}));

app.post("/create", (req, res) => {
  const operacion = req.body.operacion;
  const resultado = req.body.resultado;
  const fecha_hora = req.body.fecha_hora;
  db.query(
    "INSERT INTO datos(operacion,resultado,fecha_hora) VALUES (?,?,?)",
    [operacion,resultado, fecha_hora],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar los datos");
      } else {
        res.send("Datos Registrados");
      }
    }
  );
});

app.get("/datos", (req, res) => {
  db.query("SELECT * FROM datos", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los datos");
    } else {
      res.send(result);
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor backend corriendo en el puerto ${port}`);
});
