const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => {

    //manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        //En el status devolvemos el codigo de error que queremos regresar, puedes revisar documentacion de para que se usa cada numero de error
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    } 

    next();
}

module.exports = {
    validarCampos
}


