const { response } = require('express');
const Evento = require('../models/Eventos')

//? Consultar Eventos
const getEventos = async(req, res = response ) => {

    //Asi es la funcion para hacer select a los datos en mongo
    //const eventos = await Evento.find();

    //pero si necesitamos llamar informacion desde otro documento de Mongo en este caso el nombre del usuario hacemos lo siguiente
    //const eventos = await Evento.find().populate('user')

    //y ya que no queremos llamar a toda la informacion sino solo al nombre lo hacemos asi, en los '' donde tenemos el name podemos seguir agregando datos que queramos llamar como 'name password'
    const eventos = await Evento.find().populate('user', 'name')

    res.status(201).json({
        ok: true,
        eventos: eventos
    })

}

//? Crear Eventos
const crearEvento = async(req, res = response ) => {

    const evento = new Evento(req.body);

    try {

        //Para pasar el usuario que es requerido para almacenar en este modelo dentro de la db se hace asi
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

//? Actualizar Eventos
const actualizarEvento = async(req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        //Aca ya capturamos la nueva data que vamos a actualizar
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //?new: true es para que la respuesta no devuelva el viejo dato sino el nuevo, esto es solo para revisar y es opcional igual hace la actualizacion
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} )

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

//? Eliminar Eventos
const eliminarEvento = async(req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.status(201).json({
            ok: true,
            msg: 'Evento eliminado'
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}


