const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const check = await User.findOne({ email });
    if (check) {
        return res.status(400).json({error: 'User with the same email found'});
    }

    const cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new User({ username, email, password, cart });
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'ecommerce');
    res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const compare = password === user.password;

    if (!compare) {
        return res.status(400).json({ error: 'Incorrect Password' });
    }

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'ecommerce');
    res.status(200).json({ token });
});

module.exports = router;