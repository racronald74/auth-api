// IMPORTACIONES
// Importa la librería bcrypt para generar y comparar hashes.
const bcrypt = require("bcrypt");

// FUNCIONES
/**
 * GENERAR HASH DE LA CONTRASEÑA
 *
 * Convierte una contraseña en texto plano en un hash seguro
 * utilizando bcrypt.
 *
 * Parámetros:
 * - password: Contraseña enviada por el usuario.
 *
 * Retorna:
 * - Hash de la contraseña.
 */
async function hashPassword(password) {

    // Número de rondas utilizadas por bcrypt.
    const saltRounds = 10;

    // Genera el hash.
    return await bcrypt.hash(password, saltRounds);

}

/**
 * COMPARAR CONTRASEÑAS
 *
 * Compara una contraseña en texto plano con el hash
 * almacenado en la base de datos.
 *
 * Parámetros:
 * - password: Contraseña ingresada por el usuario.
 * - hashedPassword: Hash almacenado en la base de datos.
 *
 * Retorna:
 * - true si coinciden.
 * - false si no coinciden.
 */
async function comparePassword(password, hashedPassword) {

    return await bcrypt.compare(password, hashedPassword);

}

// EXPORTACIONES
// Exporta las funciones para que puedan ser utilizadas
// por otros servicios de la aplicación.
module.exports = {
    hashPassword,
    comparePassword
};