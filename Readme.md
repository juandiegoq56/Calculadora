# Calculadora con Jerarquía de Operaciones

Una calculadora que maneja operaciones básicas y respeta la jerarquía de las operaciones matemáticas, 
permitiendo al usuario realizar cálculos precisos. 
Los resultados y las operaciones deseadas se almacenan en una base de datos para su posterior consulta.

## Instalación

1. Clona este repositorio.
2. Entra en la ruta de la carpeta servidor y abre una ventana de comandos.
3. Instala las dependencias usando `npm install`, si cuentas con node.js si no instalalo.
4. Entra a la ruta de la carpeta vista  y abre una ventana de comandos.
5. Instala las dependencias usando `npm install`.
6. Abre el archivo Calculadora.sql y crea la base de datos.
7. En la carpeta servidor ve al archivo Api_Crud_Servidor.js y configura los parametros de conexión de la base de datos.
  host: "localhost",
  user: "root",
  password: "password",
  database: "calculadora".
8. Cabe resaltar que el servicio de la base de datos tiene que estar corriendo si es mysql y estas en windows con xammp puede correr el servicio y asi llevar a cabo la conexion.
## Ejecucion

1. En la ruta del servidor ejecuta `npm start`.
2. Una vez corra el servidor ve a la ruta de la carpeta Vista/vista  y ejecuta `npm start`.
3. Al ejecutar el comando este lo lleva al navegador a la ruta http `http://localhost:3000`, la calculadora esta en la vista `http://localhost:3000/calculadora`.
4. Para ver el historial y poder eliminar y editar los campos ve a la ruta `http://localhost:3000/datos`.




## API

La API ofrece las siguientes funcionalidades:

- `POST /create`: Crea un nuevo registro con una operación y su resultado.
- `GET /datos`: Obtiene todos los registros almacenados.
- `PATCH /update/{id}`: Actualiza un registro existente.
- `DELETE /delete/{id}`: Elimina un registro.

## Dependencias

- Express
- MySQL
- React
- Axios
- Cors
- Swagger UI Express
- Swagger JSdoc

## Documentación

La documentación de la API se encuentra en `http://localhost:3001/api-docs`.

## Contribuir

¡Siéntete libre de contribuir! Abre un pull request para proponer cambios.

## Autor

Nombre del Autor: Juan Diego Quintero Peralta.


