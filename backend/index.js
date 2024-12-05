const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const productsRouter = require('./routes/product');
const authRouter = require('./routes/users');
const reviewRouter = require('./routes/review');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.options('*', cors());

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
app.use('/reviews', reviewRouter);

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
    const { itemId } = req.body;
    const userData = await User.findOne({ _id: req.user.id });
    userData.cart[itemId]++;
    await User.findOneAndUpdate({ _id: req.user.id }, { cart: userData.cart });
});

app.post('/remove-from-cart', fetchUser, async (req, res) => {
    const { itemId } = req.body;
    const userData = await User.findOne({ _id: req.user.id });
    if (userData.cart[itemId] > 0) userData.cart[itemId]--;
    await User.findOneAndUpdate({ _id: req.user.id }, { cart: userData.cart });
});

app.post('/getcart', fetchUser, async (req, res) => {
    const userData = await User.findOne({ _id: req.user.id });
    res.status(200).json(userData.cart);
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kibromhs81@gmail.com',
        pass: process.env.PWD
    }
});

app.post('/send-email', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: email,
        to: 'kibromhs81@gmail.com',
        subject: `Subscribe to newsletter`,
        text: `${email} Subscribed to newsletter`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({message: 'Failed to send email'});
        }
        console.log('Email sent:', info.response);
        res.status(200).json({message: 'Email sent successfully'});
    });
});

app.post('/create-payment-session', async (req, res) => {
    const { amount } = req.body;
    const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CHAPA_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "amount": amount,
                "email": "kibromhs81@gmail.com",
                "first_name": "firstName",
                "last_name": "lastName",
                "currency": "ETB", 
                "phone_number": "0900123456",  
                "tx_ref": tx_ref,  
                "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",  
                // "return_url": "http://localhost:3000",  
                "customization[title]": "Payment for my favourite merchant",  
                "customization[description]": "I love online payments",  
                "meta[hide_receipt]": "false"
            })
        });

        const data = await response.json();

        if (data.status == 'success') {
            res.json({ success: true, paymentUrl: data.data.checkout_url });
        } else {
            console.log('Error there', data);
            res.status(500).json({ success: false, message: 'Failed to create payment session' });
        }
    } catch (error) {
        console.error("Error creating payment session:", error);
        res.status(500).json({ success: false, message: 'Error creating payment session' });
    }
});




app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log('Error', error);
    }
});
