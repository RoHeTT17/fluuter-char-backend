//Importar el modelo de usario
const Usuario = require('../models/usuario');

//Importar el modelo de mensaje
const Mensaje = require('../models/mensaje');


//recibir el uid.
//async porque es recomendable por la interacción con la base de datos
const usuarioConectado = async (uid = '') =>{

    const usuario = await Usuario.findById(uid);
    //actualizar la propiedad online
    usuario.online = true;
  
   // console.log(usuario);

    //Guardar en la base de datos ( el método save se puede usar porque en modelo de Usuario se importa mongoose)
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid = '') =>{

    const usuario = await Usuario.findById(uid);
    //actualizar la propiedad online
    usuario.online = false;

    await usuario.save();

    return usuario;
}

const grabarMesnaje = async(payload)=>{

    /*
        el payload debe tener la siguiente estructura
        payload: {
              de: '',
              para: '',
              mensaje: '',   
        }
     */

        try {
            
            //Crear instnacia del modelo
            const mensaje =  new Mensaje(payload);

            //Grabar en la base de datos
            await mensaje.save();

            return true;
        } catch (error) {
            return false;
        }

}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMesnaje
}