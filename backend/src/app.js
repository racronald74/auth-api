// Importa el framework Express
const express = require("express");

// Permite el acceso desde el frontend (React)
const cors = require("cors");

// Importa las rutas del módulo de autenticación.
const authRoutes = require("./routes/authRoutes");

// Crea la aplicación Express
const app = express();

// Middleware para permitir peticiones desde otros dominios
app.use(cors());

// Middleware para interpretar datos JSON
app.use(express.json());

// RUTAS DE LA API
// Todas las rutas relacionadas con autenticación
// tendrán el prefijo /api/auth.
app.use("/api/auth", authRoutes);

// Ruta temporal para comprobar que la API funciona
app.get("/", (req, res) => {
    res.json({
        message: "API Auth funcionando correctamente"
    });
});

// Exporta la aplicación
module.exports = app;