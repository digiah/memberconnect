'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/data/:param?', (req, res) => {
	MongoClient.connect(process.env.MONGO_URI, function (err, db) {
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
			const valid = [];
			if (req.params.param) {
				const params = req.params.param.split('|');
				const keys = ['first_name', 'last_name', 'affiliation', 'role', 'video_link', 'video', 'email', 'website_link'];
				if (params.length === 1 && keys.includes(params[0])) {
					console.log(params[0]);
					data.forEach(e => {
						let temp = {};
						temp[`${params[0]}`] = e[params[0]];
						valid.push(temp);
						return valid;
					});
				}
				data.forEach(e => { // Loops over all the JSON objects in the MongoDB
					let found = false; // Each Object is initially 'false', based on the parameters given it can be made 'true' and pushed into
					for (let key in e) { // Loops over all the keys in each individual 'data' object
						if ({}.hasOwnProperty.call(e, key)) {
							for (let i = 0; i < params.length; i++) { // Loops over all the parameters passed in the URL
								if (params[i].includes('=')) {
									const keyValue = params[i].split('=');
									if (e[keyValue[0]] !== null || e[keyValue[0]] !== undefined) { // Checks if the key exists in the object
										if (e[keyValue[0]].toString().toLowerCase().includes(keyValue[1].toLowerCase())) { // Checks if the value exists inside the object key
											found = true;
										}
									}	else { // Returns invalid if the key value is invalid
										res.json({
											errorCode: '404',
											message: `"${keyValue[0]} is not a valid key value."`
										});
									}
								} else if (e[key].toString().toLowerCase().includes(params[i].toLowerCase())) { // If the parameter is not a key value pair, check if the value is anywhere inside the object
									found = true;
								}
							}
						}
					}
					if (found) { // If the object is 'found' then push it into the array we are returning
						valid.push(e);
					}
				});
			} else { // Returns all data if no parameters are specified
				data.forEach(e => {
					valid.push(e);
				});
			}
			res.json(valid);
		});
	});
});

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
