const mongoose = require('mongoose');
// require mongoose 

// schema definition

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name:{
type:String,
required:true
    },
    price:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    }, password:{
        type: String,
        required: true
    },
    cart:[{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    wilist:[{
        type: Schema.Types.ObjectId,
        ref: 'Wilist'
    }]
});

// creating and exporting the model
const Users = mongoose.model('Users',UsersSchema)
module.exports = Users
