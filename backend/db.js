const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.URL, {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

module.exports = mongodbConnection;

