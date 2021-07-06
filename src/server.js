'use strict';
const express = require('express');
const errorHandler = require('./errorHandlers/500.js');
const notFoundHandler = require('./errorHandlers/404.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const signInRoute=require('./routes/signin')
const signUpRoute=require('./routes/signup');

app.get('/', (req, res) => {
  res.status(200).send('home');
});
app.use(signInRoute);
app.use(signUpRoute);

app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

module.exports = {
  app,
  start,
};