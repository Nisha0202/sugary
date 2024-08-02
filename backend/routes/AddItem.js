const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


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

module.exports = router;
