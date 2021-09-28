import Mongoose from 'mongoose';

const User = new Mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },    
    publicAddress: {
        type: String,
        required: true
    },
    nonce: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
});

export default Mongoose.model('User', User);