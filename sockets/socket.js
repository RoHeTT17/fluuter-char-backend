//Configurar los Mensajes de Sockets.

//importar el io
const {io} = require('../index')


//client es un dispositivo que se conecto al socket server
io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('disconnect', () => { console.log('Cliente desconectado') });

    // //Escuchar mensaje desde index.html
    // client.on('mensaje', (payload) =>{
    //     console.log('Mesaje', payload);

    //     //io es el objeto del servidor, por lo que emite para todos los dispisitivos conectados    
    //     io.emit('mensaje', {admin: 'Nuevo mensaje'})
    // })
  
});