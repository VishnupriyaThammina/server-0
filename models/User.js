const mongoose = require("mongoose");
// require mongoose

// schema definition

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  wislist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Wislist",
    },
  ],
});

// creating and exporting the model
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
