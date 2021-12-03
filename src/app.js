const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');
require('express-async-errors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'src/images')));
app.use('/api/categories', require('./controllers/category'));
app.use('/api/people', require('./controllers/person'));
app.use('/api/products', require('./controllers/product'));
app.use('/api/suppliers', require('./controllers/supplier'));
app.use('/api/sales', require('./controllers/sale'));
app.use('/api/users', require('./controllers/user'));
app.use('/api/returns', require('./controllers/return'));
app.use(errorHandler);

module.exports = app;
