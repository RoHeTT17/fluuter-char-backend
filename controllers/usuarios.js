const { response } = require("express");
//Se requiere el modelo de usuarios porque se va a conectar a la base de datos (ahí se usa el moongose)
const Usuario = require('../models/usuario');

//async porque estamos haciendo peticiones a la BD
const getUsuarios = async (req, res = response) =>{

  //Obtener todos los usuarios de la base de datos   
  //const usuarios = await Usuario.find();
  //El punto del find(). sirve para seguir concatenando métodos
  //Las {} dentro del find son para agregar condiciones
  //el - que esta en el sort es para ordenar de forma descendente, sin el - seria ascendente
  //el _id se establece en la validación del middlewares/validar-jwt.js
  
  //Esta cosa es para paginaciones (no se bien que show)
  const desde = Number (req.query.desde) || 0;

  const usuarios = await Usuario
         //Buscar todos los usuario  cuyo id sea diferente al del la persona que esta haciendo la petición
         //.find() //Retorna todos los usuario
         //ne = not existend  
        .find({_id: {$ne: req.uid}})//Quitar al usuario que este logueado (para que no aparezca el mismo)
        .sort('-online')//Los que estan conectados aparezcan primero
        .skip(desde)
        .limit(2)//Limita a 2 la cantidad de registro que regresa la consulta

    return res.status(200).json({
        ok: true,
        usuarios,
        desde
    });
}

module.exports = {
    getUsuarios
}