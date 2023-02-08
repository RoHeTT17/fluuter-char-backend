const Mensajes = require('../models/mensaje'); 

const obtnerChat = async(req,res) =>{

    //En la petición debe mandarse el x-token en el header

    const miUid = req.uid;
    //El .de se esta tomando del parámetro en routes/mensajes
    const mensajesDe = req.params.de; 

    //Hacer el query
    const last30 = await Mensajes.find({
        $or: [
                //donde de sea igual a miUid y para sea igual a mensajesDe
                {de: miUid,      para: mensajesDe},
                //or los que he recibido de esa persona
                {de: mensajesDe, para: miUid}
             ]
    })
    .sort({ createdAt: 'desc'}) //createAt es el campo de la fecha de la base de datos
    .limit(30); //solo los ultimos 30

    res.json({
        ok: true,
        mensajes: last30
    });

}

module.exports = {
    obtnerChat
}