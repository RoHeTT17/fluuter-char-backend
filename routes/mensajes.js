/*
 *path donde se manda llamar este servicio
  path: api/mensajes
 */

  const { Router}       = require('express');
  const { obtnerChat }  = require('../controllers/mensajes');
  const { validarJWT }  = require('../middlewares/validar-jwt');
  
  const router = Router();
  
  //Validar JWT
  //:de es para pedir un parámetro en la url y en controller obtenerlo
  router.get('/:de',validarJWT,obtnerChat);
  
  module.exports = router;