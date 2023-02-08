//importar una librerías
const express = require('express');
const path = require('path');

//Establecer las variables de entorno (archivo .env)
require('dotenv').config();

//DB Config
const {dbConnection} = require('./database/config');
dbConnection();

//Crear una aplicación de express
const app = express();

//Configurar la lectura y parseo de la información que viene en el Body de una petición http
//esyo ya viene en el paquete de express
app.use(express.json());

//Crear el Node Server (una vez ya instalado el socket.io)
//Recibe como parámetro la app de express que creamos.
const server = require('http').createServer(app);

//Cuando la configuración del socket estaba en este archivo se podía usar así
//const io = require('socket.io')(server);

//Como la configración ahora esta en otro archivo, se debe exportar el io para poder usar lo en el otro archivo
module.exports.io = require('socket.io')(server);


//Configurar los Mensajes de Sockets.
//Mandar a llamar el archivo donde se hace la configuración del io
require('./sockets/socket');

//path publico
//__dirname apunta a donde sea que este montado el servidor
const publicPath = path.resolve(__dirname, 'public');

//Mis rutas
//Primer parámetro, es el path que se quiere llamar (el que se manda la url), 
//Segundo parámetro es al path (interno) que  va responder
//Ejemplo de como se uso en postman localhost:3001/api/login/new
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
//Obtener los mensajes de un chat
app.use('/api/mensajes', require('./routes/mensajes'));

//Cuando se haga una petición que muestre el publicpath
app.use(express.static(publicPath));

//Escuchar las peticiones por el puerto 3000
server.listen(process.env.PORT, (error) =>{

    //Validar si hay un error
    if(error) throw new Error(error);

    //No hay error
    console.log('Servidor corriendo en puerto!', process.env.PORT);

});

