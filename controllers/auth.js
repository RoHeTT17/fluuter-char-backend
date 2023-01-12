const { response} = require('express');
const bcrypt = require('bcryptjs');
//Se movio al middleware
//const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req,res = response)=>{
        
        //La validación se mobio al Middleware personalizado

        // const errores = validationResult(req);

        // if(!errores.isEmpty()){
        //     return res.status(400).json({
        //         ok: false,
        //         errores: errores.mapped()
        //     });
        // }
        
        //Extraer el email del body, para valdiar que no este registrado
        //const {email, password, nombre} = req.body; //extraer varios campos
        //const email = req.body.email; // se puede hacer así o de la siguiente manera
        const {email, password} = req.body;
        
        try {
            
            //Hacer un query a la base de datos
            //const existeEmail = await Usuario.findOne({email: email});
            //O se puede simplificar asi porque el campo se llama igual
            const existeEmail = await Usuario.findOne({email});

            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'El correo ya esta registrado'
                });
            }

            //Usar el schema de Usuario, se extrae el boy y se le manda    
            const usuario = new Usuario(req.body);

            //Encriptar contraseña
            //salt es usa en crytologia para generar u número o números de manera aleatoria, de tal manera
            //que si dos usuario tenga la misma contraseña, siempre el salt será diferente, por lo que seran 
            //contraseñas (Encriptadas) diferentes.
            const salt = bcrypt.genSaltSync(); 

            //hasSync para generar la contraseña encriptada
            //primer parámetro es el password que viene en el req.body
            usuario.password = bcrypt.hashSync(password,salt);

            //Guardar en la base de datos
            await usuario.save();

            //Genrar JWT
            //es usuario.id, porque ya se cambio en el save
            const token = await  generarJWT(usuario.id);

            //respondemos en formato json 
            res.json({
                ok:true,
                //body: req.body,
                usuario,
                token
                //msg: 'Crear usuario'
            });   

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
}

const login = async (req,res = response)=>{

    const {email, password} = req.body;    

    try{

        //verificar email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        //validar password
        //Primer parámetro es el password de la req, el segundo el que esta guardado en la BD
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

         //Respuesta del login correcta 
        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });  

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
} 

const renewToken = async (req, res = response) =>{

    //obtener el uid del usuario que esta renovando el token
    //es del req porque lo sustituimos en el validar-jwt
    const uid = req.uid;   
        
    //generar un nuevo token
    const tokenRenew = await generarJWT(uid);

    //Obtener el objeto usuario por el uid
    const usuarioDB = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario: usuarioDB,
        tokenRenew
    });

}

module. exports = {
    crearUsuario,
    login,
    renewToken

}