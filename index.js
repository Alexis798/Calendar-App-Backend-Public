//Con este archivo ya creamos un backend server que esta listo para aceptar peticiones
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config()

//* Esto es para verificar todos los procesos que estan corriendo y la informacion como el puerto
//console.log( process.env )

//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS (libreria que nos permite restringir las url que pueden consultar nuestras api)
app.use(cors())

// Directorio Publico
app.use( express.static('public') );

// Lectura y parseo (interpretacion en string) de los objetos enviados a traves de los body
app.use( express.json() );


//* esto es un ejemplo para que el servidor devuelva un ok en postman y en web y en terminal el console.log
// Rutas
//? Aca decimos que todo lo que routes va a exportar lo va a habilitar en "api/auth", si cambiamos "api/auth"
//? El url deberia apuntar a esa ruta para poder comprobar que trabaja
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//!Esta ruta que vamos a agregar es para que no ocurra un error al ejecutar el frontend que se encuentra en public, se conoce como excepcion
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//app.get('/', (req, res) => {
//req es peticion y res respuesta
//
//    console.log('se requiere el /')
//    res.json({
//        ok: true,
//    })
//
//})

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT  }`)
})