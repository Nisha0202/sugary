const express = require('express');
const router = express.Router();
const Order = require('../models/Order.js');


router.post('/orderlist', async (req, res) => {
  try {
 //   console.log('Received order data:', req.body);
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

// Route to get all orders
router.get('/orderlist', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;

