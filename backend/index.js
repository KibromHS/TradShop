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
app.use(cors());

mongoose.connect('mongodb+srv://kibromhs:Haile_5ilasse@cluster0.pho01zc.mongodb.net/trad_shop?retryWrites=true&w=majority').then(() => console.log('Database Connected')).catch((e) => console.log('DB Error', e));

const storage = multer.diskStorage({
    destination: './upload',
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.use('/upload', express.static('./upload'));

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
})