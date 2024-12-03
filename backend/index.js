const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const productsRouter = require('./routes/product');
const authRouter = require('./routes/users');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000']
}));

app.options('*', cors()); // Allow preflight requests

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log('DB Error', e));

const storage = multer.diskStorage({
    destination: './upload/assets',
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.use('/upload', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // For static assets
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
}, express.static('./upload/assets'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.status(200).json({
        imageUrl: `http://localhost:${port}/upload/${req.file.filename}`
    });
});

app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.get('/new-collections', async (req, res) => {
    const products = await Product.find({});
    const newCollection = products.slice(1).slice(-8);
    res.status(200).json(newCollection);
});

app.get('/popular-women', async (req, res) => {
    const products = await Product.find({ category: 'women' });
    const popular = products.slice(0, 4);
    res.status(200).json(popular);
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    try {
        const data = jwt.verify(token, 'ecommerce');
        req.user = data.user;
        next();
    } catch(e) {
        console.error('Error', e);
        res.status(401).json({ error: 'Invalid Token' });
    }
}

app.post('/add-to-cart', fetchUser, async (req, res) => {
    const { itemId, user } = req.body;
    const userData = await User.findOne({ _id: user.id });
    userData.cart[itemId]++;
    await User.findOneAndUpdate({ _id: user.id }, { cart: userData.cart });
});

app.post('/remove-from-cart', fetchUser, async (req, res) => {
    const { itemId, user } = req.body;
    const userData = await User.findOne({ _id: user.id });
    if (userData.cart[itemId] > 0) userData.cart[itemId]--;
    await User.findOneAndUpdate({ _id: user.id }, { cart: userData.cart });
});

app.post('/getcart', fetchUser, async (req, res) => {
    const { user } = req.body;
    const userData = await User.findOne({ _id: user.id });
    res.status(200).json(userData.cart);
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log('Error', error);
    }
});
