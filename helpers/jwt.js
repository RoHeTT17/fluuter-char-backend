const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{

    return new Promise((resolve, reject)=>{
        
        const payload ={
            uid/*,
            nombre*/
        };
    
        //Segundo argumento es un secret o private key. Es una plabra secreta (se debe tener mucho cuidado
        //de que no pueda caer en manos equivocadas)
        //Con cambiarla (en este caso esta en el .env), todos los token generados quedan invalidos
        jwt.sign(payload, process.env.JWT_key,{
            expiresIn: '24h' //se recomienda que duren poco como unas 12h 
        }, (err, token)=>{
            //Este callback se dispara con un error (si es que suecede) o con un token si todo sale bien
    
            if(err){
                //no se pudo crear el token
                reject('No se pudo generar el JWT');
            }else{
                //Tenemos el token
                resolve(token);
            }
    
        });
    
    });

};

module.exports = {
    generarJWT
}