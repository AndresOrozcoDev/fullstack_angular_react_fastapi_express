const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
require('dotenv').config();

const swaggerDocs = require('./swagger');
const usersRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuración de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuración de CORS
const corsOptions = {
  origin: ['*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));

// Ruta para servir el archivo JSON de OpenAPI
app.get('/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Rutas principales
app.use('/api/users', usersRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  console.log(`OpenAPI JSON available at http://localhost:${PORT}/openapi.json`);
});