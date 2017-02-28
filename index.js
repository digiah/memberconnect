'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

const db = MongoClient.connect('mongodb://localhost:27017/memberconnect', function (err, db) {
	if (err) {
		return console.error('Connection Error. Database error.');
	}
	console.log(db);
});

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/test/:param', (req, res) => {
	console.log(db);
	res.send('lol');
});

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
