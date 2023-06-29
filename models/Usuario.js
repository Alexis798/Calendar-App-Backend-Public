//Aca configuramos los tipo de valores que le pasaremos a la base de datos
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//Asi exportamos el esquema que usuaremos para almacenar los usuarios en la base de datos
//el "Usuario" mongo lo pasara a "Usuarios" y sera el nombre de nuestra tabla que en mongo se conoce como libros
module.exports = model('Usuario', UsuarioSchema);