'use strict';
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
