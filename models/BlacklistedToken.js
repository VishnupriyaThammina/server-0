const mongoose = require('mongoose');
// require mongoose 

// schema definition

const Schema = mongoose.Schema;

const BlacklistedTokenSchema = new Schema({
    tid:{
type:String,
required:true
    },
    createdAt: {
        type: Date,
        expires: 600, // 10 minutes in seconds
        default: Date.now
    }
   
});

// creating and exporting the model
const BlacklistedToken = mongoose.model('BlacklistedToken',BlacklistedTokenSchema)
module.exports = BlacklistedToken
