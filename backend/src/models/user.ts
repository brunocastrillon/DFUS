import Mongoose from 'mongoose';

const User = new Mongoose.Schema({
    Id: {
        type: String,
        required: false
    },
    Name: {
        type: String,
        required: false
    },    
    PublicAddress: {
        type: String,
        required: true
    },
    Nonce: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
});

export default Mongoose.model('User', User);