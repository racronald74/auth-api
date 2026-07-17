// FUNCIONES DE RESPUESTA
/**
 * RESPUESTA EXITOSA
 *
 * Construye una respuesta estándar cuando una operación
 * finaliza correctamente.
 *
 * Parámetros:
 * - message: Mensaje descriptivo.
 * - data: Información que será enviada al cliente.
 *
 * Retorna:
 * - Objeto con la estructura estándar de éxito.
 */
function success(message, data = null) {

    return {
        success: true,
        message,
        data
    };

}

/**
 * RESPUESTA DE ERROR
 *
 * Construye una respuesta estándar cuando ocurre
 * un error durante el procesamiento.
 *
 * Parámetros:
 * - message: Descripción del error.
 *
 * Retorna:
 * - Objeto con la estructura estándar de error.
 */
function error(message) {

    return {
        success: false,
        message
    };

}

// EXPORTACIONES
// Exporta las funciones para que puedan ser utilizadas
// por cualquier controlador de la aplicación.
module.exports = {
    success,
    error
};