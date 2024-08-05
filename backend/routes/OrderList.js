const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a schema and model for orders
const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      size: Number,
      quantity: Number
    }
  ],
  dateTime: Date,
  location: String,
  bill: Number
});



const Order = mongoose.model('orders', orderSchema);

router.post('/orderlist', async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    const orderData = req.body;

    // Create a new order
    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully'});
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;

