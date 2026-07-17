// IMPORTACIONES

// Importa el servicio de autenticación, encargado de la lógica de negocio.
const authService = require("../services/authService");
// Importa las funciones que construyen las respuestas estándar de la API.
const response = require("../utils/response");

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
        res.status(201).json(
    response.success(
        "Usuario registrado correctamente.",
        {
            id: result.insertId,
            username
        }
    )
);

    } catch (error) {

    // Devuelve una respuesta de error.
    res.status(400).json(
    response.error(error.message)
);

    }

}

/**
 * INICIAR SESIÓN
 *
 * Recibe las credenciales enviadas por el cliente,
 * delega la autenticación al servicio y devuelve
 * una respuesta HTTP.
 */
async function login(req, res) {

    try {

        // OBTENER DATOS DE LA PETICIÓN
        const { username, password } = req.body;

        // AUTENTICAR USUARIO
                const user = await authService.loginUser(username, password);

        // RESPUESTA EXITOSA
                res.status(200).json(
            response.success(
                "Inicio de sesión exitoso.",
                user
            )
        );

    } catch (error) {

        // RESPUESTA DE ERROR
        res.status(401).json(
        response.error(error.message)
        );

    }

}

// EXPORTACIONES
// Exporta las funciones del controlador para que puedan
// ser utilizadas por las rutas.
module.exports = {
    register,
    login
};