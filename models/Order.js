const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    allProducts:[
        {
            pid:{
                type: String,
                required: true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    amount:{
        type:Number,
        required: true
    },
    status: {
        type: String,
        default: "Not processed",
        enum: [
          "Not processed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],
      },

      address:{
        type:String,
        required:true
      },
      createdAt: {
          type: Date,
          default: Date.now
      }
})

const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;
