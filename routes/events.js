/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router()
const { isDate } = require('../helpers/isDate')

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//Todas tiene que validar el JWT
router.use( validarJWT )
//? Al hacer esto no tenemos que poner en los demas router el validar ya que todos estan llamando a este middleware entre la ruta y la funcion, subimos el middleware de nivel
//? Si quieres que una sea publica la subes antes de que se ejecute el router.use( validarJWT )
//Para revalidar el token vuelve a hacer en el postman la consulta del Login y sera entregado uno nuevo que debes pasar en el header como x-token 
// Obtener eventos
router.get('/', getEventos )

// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        //check no valida fechas por lo que tenemos que poner custom para crear nuestra funcion que valide el campo
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de inicio es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento)

//Actualizar evento
router.put('/:id', actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;