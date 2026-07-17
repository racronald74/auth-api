// Importa la versión de mysql2 basada en Promesas
const mysql = require("mysql2/promise");

// Crea el pool de conexiones utilizando las variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Configuración del pool
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para comprobar la conexión con MySQL
async function testConnection() {

    try {

        const connection = await pool.getConnection();

        console.log("Conexión a MySQL establecida correctamente.");

        connection.release();

    } catch (error) {

        console.error("Error al conectar con MySQL:");
        console.error(error);

    }

}

// Ejecuta la prueba de conexión
testConnection();

// Exporta el pool
module.exports = pool;