'use strict';
const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('./script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/script.js'));
});

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
