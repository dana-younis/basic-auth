'use strict';
require('dotenv').config();
// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

const cors = require('cors');
const morgan = require('morgan');



// Prepare the express app
const app = express();


const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


// Process JSON input and put the data on req.body
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));



const notFoundHandler = require('./src/errorHandlers/404.js');
const errorHandler = require('./src/errorHandlers/500.js');

const signin = require('./src/routes/signin');
const signup = require('./src/routes/signup');

app.get('/', (request, response) => {
  response.send('Welcome to home page 6');
});

app.get('/foo', (request, response) => {
  throw new Error('Error');
});

//app.use(routes);
app.use('/', signin);
app.use('/', signup);

app.use('*', notFoundHandler);
app.use(errorHandler);


let startServer = (PORT) => {
  app.listen(PORT, () => console.log('server up'));
};

module.exports = { app, startServer };

