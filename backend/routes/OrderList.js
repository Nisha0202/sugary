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

router.delete('/orders/:id', async (req, res) => {
  try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete order' });
  }
});

// Route to update isConfirmed status
router.patch('/orders/:id/confirm', async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }
      order.isConfirmed = true;
      await order.save();
      res.json(order);
  } catch (error) {
      console.error('Error confirming order:', error);
      res.status(500).json({ message: 'Failed to confirm order' });
  }
});



// Get orders for a specific user
router.get('/orderlist/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ useremail: email });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;

