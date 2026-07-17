// Importa la librería mysql2
const mysql = require("mysql2");

// Crea la conexión utilizando las variables del archivo .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Establece la conexión con la base de datos
connection.connect((error) => {

    if (error) {
        console.error("Error al conectar con MySQL");
        console.error(error);
        return;
    }

    console.log("Conexión a MySQL establecida correctamente.");

});

// Exporta la conexión
module.exports = connection;