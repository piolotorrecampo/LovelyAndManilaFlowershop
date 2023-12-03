const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');
const cloudinary = require('./utils/cloudinary');
const port = process.env.PORT || 5000;
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Successfully connected to database.')).catch((err) => {console.error(err)});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/flower', require('./routes/flowerRoutes'));
app.use('/api/ocassion', require('./routes/ocassionRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Backend server is running at port ${port}`);
})
