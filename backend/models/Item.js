const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|bmp|webp|ico))$/,
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
    enum: ['vegan', 'non-vegan'],
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
});

const Item = mongoose.model('Cupcake', ItemSchema);

module.exports = Item;
