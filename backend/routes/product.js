const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const product = await Product.find({});
    res.status(200).json({ product });
});

router.post('/', async (req, res) => {
    const { name, oldPrice, newPrice, category } = req.body;

    const products = await Product.find({});
    let id;

    if (products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({ id, name, oldPrice, newPrice, category });
    await product.save();
    res.status(201).json({ product });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ id });
    res.status(200).json({ product });
});

module.exports = router;