import Mongoose from 'mongoose';

const User = new Mongoose.Schema({
    nome: {
        type: String,
        required: false
    },
    publicAddress: {
        type: String,
        required: true
    },
    nonce: {
        type: Number,
        required: true,
        defaultValue: () => Math.floor(Math.random() * 1000000)
    }
},
{
    timestamps: true,
});

export default Mongoose.model('User', User);