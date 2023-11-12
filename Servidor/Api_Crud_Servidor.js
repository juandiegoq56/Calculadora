const express = require("express"); // Importa espress
const app = express(); // le asigna el valor a app de express
const mysql = require("mysql"); // Importa Mysql de express
const cors = require("cors");  // Importa Los cors para permitir la comunicación de la api con app ejcutandose en las direcciones permitidas

app.use(express.json()); 

const db = mysql.createConnection({  // Crea la conexión con la base de datos
  host: "localhost",
  user: "root",
  password: "password",
  database: "calculadora",
});

app.use(cors({                      // asigna las direcciones con la que se va a comunicar la API
  origin: 'http://localhost:3000' 
}));

app.post("/create", (req, res) => {  // Se realiza la funcion  Crear, atraves del metodo POST 
  const operacion = req.body.operacion; // Recupera los valores de las variables de la calculadora.
  const resultado = req.body.resultado;
  const fecha_hora = req.body.fecha_hora;
  db.query(
    "INSERT INTO datos(operacion,resultado,fecha_hora) VALUES (?,?,?)", // utiliza una sentencia sql para hacer la crear los datos los campos especificos
    [operacion,resultado, fecha_hora],
    (err, result) => {    // manejo de errores de creación
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar los datos");
      } else {
        res.send("Datos Registrados"); //Respuesta de la creación de los datos
      }
    }
  );
});

app.get("/datos", (req, res) => {     // Se implementa la funcion  obtener, atraves del metodo GET 
  db.query("SELECT * FROM datos", (err, result) => {  // se realiza la sentencia sql para traer los datos.
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los datos");// manejo de errores.
    } else {
      res.send(result);
    }
  });
});

app.patch("/update/:id", (req, res) => {   // Se implementa la funcion editar, atraves del metodo PATCH.
  const id = req.params.id;                // Recupera los valores a guardar
  const operacion = req.body.operacion;
  const resultado = req.body.resultado;
  const fecha_hora = req.body.fecha_hora;
  
  db.query(
    "UPDATE datos SET operacion = ?, resultado = ?, fecha_hora = ? WHERE id = ?",
    [operacion, resultado, fecha_hora, id], // Realiza la sentencia sql para actualizar los datos.
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al actualizar los datos"); // manejo de errores
        alert('error actualizar')
      } else {
        res.send("Datos actualizados");
      }
    }
  );
});
app.delete("/delete/:id", (req, res) => {     // Implementación de la función Borrar apartir del metodo DELETE.
  const id = req.params.id; // Requiere el id de los elementos a borrar.
  db.query("DELETE FROM datos WHERE id = ?", id, (err, result) => {   // Manejo de errores.
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar los datos"); // manejo de errores.
    } else {
      res.send("Datos eliminados"); // respuesta exitosa
    }
  });
});

const port = process.env.PORT || 3001; // Se asigna el valor de la variable Process.env.Port para que corra en el puerto 3000 del localhost.

app.listen(port, () => {   // Ejecuta la API en el puerto local asignado.
  console.log(`Servidor backend corriendo en el puerto ${port}`);
});
