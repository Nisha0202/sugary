const express = require('express');
const router = express.Router();
const Item = require('../models/Item.js');


router.post('/add-item', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const cupcakeData = req.body;
    const cupcake = new Item(cupcakeData);
    await cupcake.save();
    res.status(201).json({ message: 'New Cupcake added successfully', cupcake });
  } catch (error) {
    console.error('Error adding cupcake:', error);
    res.status(400).json({ message: 'Error adding cupcake', error });
  }
});

router.get('/get-items', async (req, res) => {
  try {
    const cupcakes = await Item.find().sort({ date: -1 }); // Sort by createdAt in descending order
    res.status(200).json(cupcakes);
  } catch (error) {
    console.error('Error fetching cupcakes:', error);
    res.status(500).json({ message: 'Error fetching cupcakes' });
  }
});

module.exports = router;
