const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

const router = express.Router();

// Create a new sale
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, customerId } = req.body;
    const product = await Product.findById(productId);

    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const totalPrice = product.price * quantity;
    const sale = new Sale({
      product: productId,
      quantity,
      totalPrice,
      customer: customerId,
    });

    await sale.save();

    // Update product stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Error creating sale', error: err });
  }
});

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('product').populate('customer');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales', error: err });
  }
});

module.exports = router;
