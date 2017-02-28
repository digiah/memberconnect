'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

var db;
MongoClient.connect('mongodb://localhost:27017/memberconnect', function (err, d) {
	if (err) {
		return console.error('Connection Error. Database error.');
	}
	db = d;
});

const app = express();

app.get('/test/:param', (req, res) => {
	console.log(db.collection('people').find());
	res.send('lol');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
