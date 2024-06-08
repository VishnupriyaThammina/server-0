const mongoose = require('mongoose');
// require mongoose 

// schema definition

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    pid:{
type:String,
required:true
    },
    count:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
   
   
});

// creating and exporting the model
const Cart = mongoose.model('Cart',CartSchema)
module.exports = Cart
