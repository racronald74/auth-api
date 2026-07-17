// Carga las variables de entorno
require("dotenv").config();
// Importa la configuración de la base de datos
require("./database/database");

// Importa la aplicación Express
const app = require("./app");

// Obtiene el puerto desde el archivo .env
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});