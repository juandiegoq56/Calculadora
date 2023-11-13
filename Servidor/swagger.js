const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD',
      version: '1.0.0',
      description: 'API Juan Diego Q',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Reemplaza con la URL de tu servidor
      },
    ],
  },
  apis: ['./Api_Crud_Servidor.js'], // Ruta donde se encuentran tus archivos de rutas
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
