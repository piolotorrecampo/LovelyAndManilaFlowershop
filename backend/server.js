const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');
const cloudinary = require('./utils/cloudinary');
const port = process.env.PORT || 5000;
const cors = require("cors")

const app = express();

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Successfully connected to database.'))
        .catch((err) => {
                console.error(err)
        });

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));

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
app.use('/api/predict', require('./routes/predictRoutes'));

app.use(errorHandler);

if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

app.listen(port, () => {
    console.log(`Backend server is running at port ${port}`);
})
