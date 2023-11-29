const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');
const cloudinary = require('./utils/cloudinary');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));

app.use('/api/flower', require('./routes/flowerRoutes'));
app.use('/api/ocassion', require('./routes/ocassionRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server start on port ${port} and connected to database.`));
    })
    .catch((error) => {
        console.log(error);
    })
