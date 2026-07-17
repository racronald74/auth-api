// IMPORTACIONES
// Importa las funciones del repositorio de usuarios.
const userRepository = require("../repositories/userRepository");
// Importa el servicio encargado de la seguridad de las contraseñas.
const securityService = require("./securityService");

// FUNCIONES AUXILIARES

/**
 * VALIDA Y NORMALIZA LAS CREDENCIALES
 *
 * Verifica que el nombre de usuario y la contraseña
 * sean obligatorios y elimina los espacios al inicio
 * y al final.
 *
 * Parámetros:
 * - username: Nombre de usuario.
 * - password: Contraseña.
 *
 * Retorna:
 * - Objeto con username y password normalizados.
 */
function validateCredentials(username, password) {

    // Valida que el nombre de usuario exista.
    if (!username || username.trim() === "") {
        throw new Error("El nombre de usuario es obligatorio.");
    }

    // Valida que la contraseña exista.
    if (!password || password.trim() === "") {
        throw new Error("La contraseña es obligatoria.");
    }

    // Retorna los valores sin espacios.
    return {
        username: username.trim(),
        password: password.trim()
    };

}

// FUNCIONES
/**
 * REGISTRAR USUARIO
 *
 * Contiene la lógica de negocio para registrar
 * un nuevo usuario.
 *
 * Reglas de negocio:
 * 1. El nombre de usuario es obligatorio.
 * 2. La contraseña es obligatoria.
 * 3. No se permiten valores vacíos o solo espacios.
 * 4. El usuario no debe existir previamente.
 * 5. Si todas las validaciones son correctas, registra el usuario.
 */
async function registerUser(username, password) {

// VALIDAR CREDENCIALES
// Valida los datos recibidos y elimina los espacios
// al inicio y al final.
const credentials = validateCredentials(username, password);

// Actualiza las variables con los valores normalizados.
username = credentials.username;
password = credentials.password;

        // VERIFICAR SI EL USUARIO YA EXISTE
        const existingUser = await userRepository.findUserByUsername(username);

    if (existingUser) {
        throw new Error("El nombre de usuario ya está registrado.");
    }

// GENERAR HASH DE LA CONTRASEÑA
// Convierte la contraseña en un hash seguro antes de almacenarla.
const hashedPassword = await securityService.hashPassword(password);

// REGISTRAR USUARIO
// Guarda el usuario utilizando la contraseña protegida.
const result = await userRepository.createUser(
    username,
    hashedPassword
);

    // Devuelve el resultado al controlador.
    return result;
}

/**
 * INICIAR SESIÓN
 *
 * Contiene la lógica de negocio para autenticar
 * un usuario registrado.
 *
 * Reglas de negocio:
 * 1. El nombre de usuario es obligatorio.
 * 2. La contraseña es obligatoria.
 * 3. No se permiten valores vacíos o solo espacios.
 * 4. El usuario debe existir.
 * 5. La contraseña debe coincidir con el hash almacenado.
 * 6. Si las credenciales son correctas, retorna la información del usuario.
 */
async function loginUser(username, password) {

    // VALIDAR CREDENCIALES
    const credentials = validateCredentials(username, password);

    username = credentials.username;
    password = credentials.password;

    // BUSCAR USUARIO
    const user = await userRepository.findUserByUsername(username);

    // Verifica que el usuario exista.
    if (!user) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    // VALIDAR CONTRASEÑA
    const isPasswordValid = await securityService.comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    // RETORNAR USUARIO AUTENTICADO
    return {
        id: user.id,
        username: user.username
    };

}

// EXPORTACIONES
// Exporta la función para que pueda ser utilizada
// por el controlador.
module.exports = {
    registerUser,
    loginUser
};