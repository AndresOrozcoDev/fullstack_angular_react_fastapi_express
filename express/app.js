const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const swaggerDocs = require("./swagger");
const db = require("./src/config/database");
const errorHandler = require("./src/middleware/errorHandler");
const authRoutes = require("./src/modules/auth/routes/auth.routes");


const app = express();
const PORT = process.env.PORT_EXPRESS || 5000;

app.use(express.json());

// Configuración de Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuración de CORS
const corsOptions = {
  origin: [
    "http://localhost:4200",
    "https://incomparable-gumdrop-472cf6.netlify.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "API_KEY"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta para servir el archivo JSON de OpenAPI
app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

// Rutas principales
app.use("/api/auth", authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  console.log(`OpenAPI JSON available at http://localhost:${PORT}/openapi.json`);
});
