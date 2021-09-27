import mongoose from 'mongoose';
require('dotenv/config');

class MongoMiddleware {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => { console.log('Conexão com o MongDb...: OK') })
            .catch((error) => { console.log(`Erro ao tentar conecatar com a base de dados! \n${error}`) });

        const connection = mongoose.connection;

        connection.on('disconnected', () => {
            console.log('Conexão com a base de dados fechada com sucesso!');
        });
    }
}

export default MongoMiddleware;