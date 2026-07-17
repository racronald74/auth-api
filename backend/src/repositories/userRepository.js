// IMPORTACIONES
// Importa el pool de conexiones a la base de datos
const pool = require("../database/database");

// FUNCIONES

// REGISTRAR USUARIO
// Inserta un nuevo usuario en la base de datos.
async function createUser(username, password) {

    // Consulta SQL para registrar un usuario
    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;

    // Ejecuta la consulta enviando los parámetros
    const [result] = await pool.execute(sql, [username, password]);

    // Devuelve el resultado de la operación
    return result;
}

/**
 * BUSCAR USUARIO POR NOMBRE
 *
 * Consulta la base de datos para verificar si existe
 * un usuario con el nombre recibido.
 *
 * Parámetros:
 * - username: Nombre del usuario.
 *
 * Retorna:
 * - El usuario encontrado.
 * - undefined si no existe.
 */
async function findUserByUsername(username) {

    // Consulta SQL para buscar un usuario.
    const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `;

    // Ejecuta la consulta.
    const [rows] = await pool.execute(sql, [username]);

    // Devuelve el primer usuario encontrado.
    return rows[0];
}

// EXPORTACIONES
// Exporta las funciones disponibles del repositorio.
module.exports = {
    createUser,
    findUserByUsername
};