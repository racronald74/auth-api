// Importa el framework Express
const express = require("express");

// Permite el acceso desde el frontend (React)
const cors = require("cors");

// Crea la aplicación Express
const app = express();

// Middleware para permitir peticiones desde otros dominios
app.use(cors());

// Middleware para interpretar datos JSON
app.use(express.json());

// Ruta temporal para comprobar que la API funciona
app.get("/", (req, res) => {
    res.json({
        message: "API Auth funcionando correctamente"
    });
});

// Exporta la aplicación
module.exports = app;