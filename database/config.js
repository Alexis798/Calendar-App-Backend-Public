const mongoose = require('mongoose')

const dbConnection = async() => {

    try {

        //Recuerda que el process.env lo esta agarrando el backend de tu archivo .env
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }

}

module.exports = {
    dbConnection
}