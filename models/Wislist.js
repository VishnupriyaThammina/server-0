const mongoose = require('mongoose');
// require mongoose 

// schema definition

const Schema = mongoose.Schema;

const WislistSchema = new Schema({
    pid:{
        type:String,
        required:true
            },
   
    price:{
        type: Number,
        required: true
    }
   
   
});

// creating and exporting the model
const Wislist = mongoose.model('Wislist',WislistSchema)
module.exports = Wislist
