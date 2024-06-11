const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3030;
const bodyparser = require('body-parser');
require('dotenv').config();

mongoose.connect('mongodb+srv://vishnupriyat20:vish@cluster0.mgnwtzl.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit with failure
});
// importing routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')


// requesst body data is recieved from the application in the form of json 
// body parser get you the req body data
app.use(bodyparser.json());
app.use('/product',productRoutes);
app.use('/user',userRoutes);

// Connect to MongoDB


app.listen(port, () => {
  console.log('Server is listening on port:', port);
});

