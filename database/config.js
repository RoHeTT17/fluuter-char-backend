//Importar el paquete de mongoose
const mongoose = require('mongoose');

//Configuración de la conexión (asincrono)
const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        
        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin.');
    }

}

//Exportar la clase (con nombre por si se agrega mas) para poder usarlas
module.exports = {
    dbConnection
}