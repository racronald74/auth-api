// IMPORTACIONES
// Importa Express para crear las rutas de la API.
const express = require("express");

// Crea un enrutador independiente de Express.
const router = express.Router();

// Importa el controlador de autenticación.
const authController = require("../controllers/authController");

// RUTAS
/**
 * REGISTRAR USUARIO
 *
 * Endpoint:
 * POST /api/auth/register
 *
 * Este endpoint recibe el nombre de usuario y la contraseña,
 * luego delega el proceso de registro al controlador.
 */
router.post("/register", authController.register);

// EXPORTACIONES
// Exporta el enrutador para que pueda ser utilizado
// por la aplicación principal (app.js).
module.exports = router;