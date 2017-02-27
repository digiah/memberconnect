'use strict';
const path = require('path');
const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/memberconnect');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error. Database error.'))

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
