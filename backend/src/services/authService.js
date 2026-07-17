// IMPORTACIONES
// Importa las funciones del repositorio de usuarios.
const userRepository = require("../repositories/userRepository");

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

    // VALIDAR NOMBRE DE USUARIO
        if (!username || username.trim() === "") {
        throw new Error("El nombre de usuario es obligatorio.");
    }

        // VALIDAR CONTRASEÑA
        if (!password || password.trim() === "") {
        throw new Error("La contraseña es obligatoria.");
    }

    // Elimina espacios al inicio y al final.
    username = username.trim();
    password = password.trim();

        // VERIFICAR SI EL USUARIO YA EXISTE
        const existingUser = await userRepository.findUserByUsername(username);

    if (existingUser) {
        throw new Error("El nombre de usuario ya está registrado.");
    }

    // REGISTRAR USUARIO
        const result = await userRepository.createUser(username, password);

    // Devuelve el resultado al controlador.
    return result;
}

// EXPORTACIONES
// Exporta la función para que pueda ser utilizada
// por el controlador.
module.exports = {
    registerUser
};