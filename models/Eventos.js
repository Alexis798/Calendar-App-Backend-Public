//Aca configuramos los tipo de valores que le pasaremos a la base de datos
const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: 'String',
        required: true
    },
    notes: {
        type: 'String',
    },
    start: {
        type: 'Date',
        required: true,
    },
    end: {
        type: 'Date',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        //Esto le va a decir a moongose que va a hacer una referencia al Schema que necesitemos, en este caso sera Usuario
        ref: 'Usuario',
        required: true
    }
});

//De esta forma podemos serializar como queremos que los campos se almacenen en mongo
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})

//Asi exportamos el esquema que usuaremos para almacenar los Eventos en la base de datos
//el "Evento" mongo lo pasara a "Eventos" y sera el nombre de nuestra tabla que en mongo se conoce como libros
module.exports = model('Evento', EventoSchema);