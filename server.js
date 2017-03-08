'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

const app = express();

app.get('/test/:param?', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/memberconnect', function (err, db) {
		if (err) {
			return console.error('Connection Error. @mongodb');
		}
		function query(callback) {
			db.collection('people').find().toArray(function (err, result) {
				if (err) {
					return console.error('Error converting data to array');
				}
				callback(result);
			});
		}
		query(function (data) {
			let valid = [];
			if (req.params.param) {
				const params = req.params.param.split('|');
				data.forEach(e => { // Loops over all the JSON objects in the MongoDB
					let found = false; // Each Object is initially 'false', based on the parameters given it can be made 'true' and pushed into
					for (let key in e) { // Loops over all the keys in each individual 'data' object
						for (let i = 0; i < params.length; i++) {
							if (params[i].includes('=')) {
								const keyValue = params[i].split('=');
								if (e[keyValue[0]] !== null || e[keyValue[0]] !== undefined) {
									if (e[keyValue[0]].toString().toLowerCase().includes(keyValue[1].toLowerCase())) {
										found = true;
									}
								}	else {
									res.json({
										errorCode: '404',
										message: `"${keyValue[0]} is not a valid key value."`
									});
								}
							} else if (e[key].toString().toLowerCase().includes(params[i].toLowerCase())) {
								found = true;
							}
						}
					}
					if (found) {
						valid.push(e);
					}
				});
			} else {
				valid = data;
			}
			res.json(valid);
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
