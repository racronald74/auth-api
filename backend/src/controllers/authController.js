// IMPORTACIONES

// Importa el servicio de autenticación, encargado de la lógica de negocio.
const authService = require("../services/authService");

// FUNCIONES

/**
 * REGISTRAR USUARIO
 *
 * Esta función recibe la petición HTTP enviada por el cliente,
 * obtiene los datos del cuerpo de la petición (body),
 * llama al servicio para registrar el usuario y
 * devuelve una respuesta al cliente.
 */
async function register(req, res) {

    try {

        // Obtiene el nombre de usuario y la contraseña enviados por el cliente.
        const { username, password } = req.body;

        // Llama al servicio para registrar el usuario.
        const result = await authService.registerUser(username, password);

        // Devuelve una respuesta exitosa.
        res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente.",
            data: {
                id: result.insertId,
                username: username
            }
        });

    } catch (error) {

        // Devuelve una respuesta de error.
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

// EXPORTACIONES
// Exporta las funciones del controlador para que puedan
// ser utilizadas por las rutas.
module.exports = {
    register
};