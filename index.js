  
"use strict";
require("dotenv").config();
const mongoose = require('mongoose');
const server = require("./src/server.js");
const PORT = process.env.PORT||3000;
const MONGODB_URI = 'mongodb://localhost:27017/auth';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).then(() => {
    server.start(PORT);
    console.log("Connected to MongoDB");
  }).catch((e) => console.error("SERVER ERROR", e.message));