const mongoose = require("mongoose");
// require mongoose

// schema definition

const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
pid:{
    type:String,
    immutable:true,// cant be changed 
    unique:true,
    required:true
},
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail:{
    type:String,
    required:true
  },
  images: [
    {
      type: String,
    },
  ],
});

// creating and exporting the model
const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
