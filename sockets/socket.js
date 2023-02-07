//Configurar los Mensajes de Sockets.

//importar el io
const {io} = require('../index')
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado} = require('../controllers/socket');

//client es un dispositivo que se conecto al socket server
io.on('connection', client => {

    console.log('Cliente conectado');
    //handshake es la forma en que esta la comunicación entre el servidor y el cliente
    //console.log(client.handshake.headers);

    //No se usar el middleware validar-jwt.js porque ese debe recibir el request,response y next
    //comprobarJWT retorna un arreglo por eso aquí el const tiene []
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Si no es valido, desconectar al cliente
    if(!valido){return client.disconnect();}

    //Cliente autenticado
    usuarioConectado(uid);

    //sala global (todos los dispositivos conectados estan en esta sala)
    
    //Ingresar al usuario a una sala en particular (Es el uid de la base de datos) entre parentesis
    //es el nombre que les tamos dando a la sala, para identificarla
    client.join(uid);

    //Asi sería para mandar mensajes privado, pero no lo queremos así porque se van a guardar en
    // la base de datos.    
    //client.to(uid).emit('name_event');    

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', (payload) =>{
        console.log(payload);

    });

    client.on('disconnect', () => {
          usuarioDesconectado(uid);
         console.log('Cliente desconectado');
    });

    // //Escuchar mensaje desde index.html
    // client.on('mensaje', (payload) =>{
    //     console.log('Mesaje', payload);

    //     //io es el objeto del servidor, por lo que emite para todos los dispisitivos conectados    
    //     io.emit('mensaje', {admin: 'Nuevo mensaje'})
    // })
  
});