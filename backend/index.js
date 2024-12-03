const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const productsRouter = require('./routes/product');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Corrected CORS setup
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

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log('Error', error);
    }
});
