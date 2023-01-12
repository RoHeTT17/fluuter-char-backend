const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) =>{

    //Leer token- del header (x-token es como lo definimos en el header de la petición )
    const token = req.header ('x-token');

    //console.log(token);

    if(!token){
        return res.status(401).json({
            ok: flase,  
            msg: 'No hay token en la petición'
        });
    }

    try {

        //Extraer el uid que viene en el header del token (recordar que un jwt esta formado por 3 partes)
        //Se verifica el token que extrajimos del header contra la llave secreta
        const {uid} = jwt.verify(token,process.env.JWT_key);
        //regresar el id del usuario
        req.uid = uid;

        next();
        
    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        });
        
    }



}

module.exports ={
    validarJWT
}