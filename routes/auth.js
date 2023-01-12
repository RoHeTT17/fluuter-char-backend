/*
 *path donde se manda llamar este servicio
  path: api/login
 */

const{Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login,renewToken } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/*
 * req = request -> Solicitud
   res = response -> respuesta
   
   el res = response se usa para que sea de una poquita ayuda en cierto tipado.
*/
// router.post('/new', (req,res = response)=>{

//     //respondemos en formato json 
//     res.json({
//         ok:true,
//         msg: 'Crear usuario'

//     });

// });

//Se separo el controllador (el callback) en un archivo externo. Solo se pone la referencia a ese controllador.
//al hacerlo de esta manera se puede quitar el response de const{Router, response} = require('express');
//router.post('/new', crearUsuario);


//Agrengado un Middleware para validación de campos. Se pone entre [] para agregar varios middleware
router.post('/new',[
  check('nombre','El nombre es obligatorio').notEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'LA contraseña es obligatorio').notEmpty(),
  validarCampos
],crearUsuario);


//Login 
router.post('/',[
  check('email','El correo es obligatorio').isEmail(),
  check('password','La contraseña es obligatoria').notEmpty(),
  validarCampos
],login);

//Validar JWT
router.get('/renew',validarJWT,renewToken);

module.exports = router;