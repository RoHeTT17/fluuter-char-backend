const {validationResult} = require('express-validator')

//next es un callback que le indica a express que si todo sale bien, 
//continue con el siguiente middleware
const validarCampos = (req,res, next) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }
    //Movernos al siguiente middleware
    next();

};

module.exports = {
    validarCampos
}