//Esta linea de express en este archivo no es obligatorio pero es para tener el autocompletado a la hora de
// escribir codigo en este archivo y al res le tenemos que pasar el response del require
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

//? Crear Usuarios
const crearUsuarios = async(req, res = response ) => {

    //Esto lo desestructuramos para que la res nos devuelva el body que le enviamos al servidor
    //De esta forma se hace si es una peticion Post
    const { email, password } =  req.body;

    try {

        //ASI HACEMOS LA VALIDACION SI EL EMAIL EXISTE PARA QUE NO REGISTRE NADA
        let usuario = await Usuario.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya esta registrado'
            })
        }

        //ASI EJECUTARIAMOS EL REGISTRO SIN VALIDAR EL CORREO SI YA EXISTE
        //Importamos el esquema que usuaremos para registrar a Mongo
        usuario = new Usuario( req.body )

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Asi mandamos a que se guarde en la base de datos
        await usuario.save();

        // Generar Json Web Token
        const token = await generarJWT( usuario.id, usuario.name)

        //Respuesta esperada si todo salio bien
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

//? Login de Usuario
const loginUsuario = async(req, res = response ) => {

    const { email, password } =  req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no es valido'
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            })
        }

        // Generar Json Web Token
        const token = await generarJWT( usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

//? Revalidar el JSON WEB TOKEN
const revalidarToken = async(req, res = response ) => {

    const uid = req.uid
    const name = req.name

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })

}

module.exports = {
    crearUsuarios,
    loginUsuario,
    revalidarToken
}