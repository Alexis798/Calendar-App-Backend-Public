//Asi es como debemos crear el archivo para poder exportarlo y usarlo en el index.js

/* 
    Esta archivo contiene:
    Rustas de Usuarios / Auth

    para probarlo debes escribir en postman o el navegador
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator')
const router = Router()

const { crearUsuarios, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

//? el .get es el tipo de peticion que le haces al servidor, por ejemplo para crear usuario deberias usar .post y borrar .delete
//router.get('/', (req, res) => {
//    console.log('se requiere el /')
//    res.json({
//        ok: true,
//    })
//})

// Crear usuario
// Para trabajar debemos poner la ruta anteriormente definida arriba mas la ruta que creamos aca "host/api/auth/new" 
//Estos son nuestros ENDPOINTS 

//Esta seria la forma base del EndPoint
//router.post('/new', crearUsuarios )

//Pero ahora agregaremos middlewares para capturar lo que nos devuelve el server
router.post(
    '/new', 
    [ //middlewares
        //Asi evaluamos si existe un campo que necesitemos
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6, }),
        validarCampos
    ], 
    crearUsuarios )

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6, }),
        validarCampos
    ], 
    loginUsuario )

router.get('/renew', validarJWT , revalidarToken )

module.exports = router;