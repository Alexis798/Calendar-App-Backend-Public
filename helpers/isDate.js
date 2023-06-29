const moment = require('moment');

const isDate = ( value, rest) => {
    
    //Si no hay valor devolvera false lo que le dira al express validator que el valor no existe
    if( !value ) {
        return false;
    }

    const fecha = moment( value );

    if( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isDate };