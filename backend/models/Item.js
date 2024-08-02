const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pricePerSix: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerTwelve: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,

  },
  weight: {
    type: Number,
    required: true,
    min: 1,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  others: {
    type: String,
    default: null,
  },
  date: {
    type: String, // Change type to String to store formatted date
    default: () => moment().format('MM/DD/YYYY hA') // Default format
  },
});

// Pre-save hook to format the date
ItemSchema.pre('save', function(next) {
  this.date = moment().format('MM/DD/YYYY h:mm A');
  next();
});

const Item = mongoose.model('cupcakes', ItemSchema);

module.exports = Item;
