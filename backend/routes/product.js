const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
});

router.post('/', async (req, res) => {
    const { name, image, oldPrice, newPrice, category, description } = req.body;

    const products = await Product.find({});
    let id;

    if (products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({ id, name, image, oldPrice, newPrice, category, description });
    await product.save();
    res.status(201).json(product);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ id });
    res.status(200).json(product);
});

module.exports = router;