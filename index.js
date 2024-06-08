const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3030;

// Connect to MongoDB
mongoose.connect('mongodb+srv://vishnupriyat20:vish@cluster0.mgnwtzl.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit with failure
});

app.listen(port, () => {
  console.log('Server is listening on port:', port);
});

