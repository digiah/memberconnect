'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const indicative = require('indicative');
require('dotenv').config();
const spawn = require('child_process').spawn;
const request = require('request');

// Synced with the Google Spreadsheet
require('cron').CronJob({
	cronTime: '00 00 * * * *',
	onTick: function () {
		spawn('python', [path.join(__dirname, 'people_input_script.py')]);
	},
	start: true,
	timeZone: 'America/Los_Angeles'
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	if (req.query.ticket) {
		request(`https://authn.hawaii.edu/cas/validate?service=https://dahi.manoa.hawaii.edu/njs&ticket=${req.query.ticket}`, function (err, response, data) {
			if (data === "no") {
				return res.sendFile(path.join(__dirname, 'public/index.html'));
			} 
		});
	}
	return res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/new', (req, res) => res.sendFile(path.join(__dirname, 'public/new.html')));
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));
app.get('/admin', (req, res) => {
	if (req.query.ticket) {
		request(`https://authn.hawaii.edu/cas/validate?service=https://dahi.manoa.hawaii.edu/njs/admin&ticket=${req.query.ticket}`, function (err, response, data) {
			if (data !== "no") {
				return res.sendFile(path.join(__dirname, 'admin.html'));
			}
		});
	}
	return res.send("Forbidden");
});

app.post('/create', (req, res) => {
	indicative.validateAll(req.body, {
		first_name: 'required',
		last_name: 'required',
		affiliation: 'required',
		role: 'required',
		email: 'required|email'
	})
	.then(function () {
		MongoClient.connect(process.env.MONGO_URI, function (err, db) {
			if (err) {
				return console.error('Connection Error. @mongodb');
			}
			try {
				db.collection('people').insert(req.body);
			} catch (err) {
				console.error('Error Inserting. @mongodb');
			}
			db.close();
			return res.sendFile(path.join(__dirname, 'index.html'));
		});
	})
	.catch(function (errors) {
		console.log(`${JSON.stringify(req.body)} did not pass validation. @app.post`);
	});
});

app.put('/edit', function (req, res) {
	indicative.validateAll(req.body, {
		first_name: 'required',
		last_name: 'required',
		affiliation: 'required',
		role: 'required',
		email: 'required|email'
	})
	.then(function () {
		MongoClient.connect(process.env.MONGO_URI, function (err, db) {
			if (err) {
				return console.error('Connection Error. @mongodb');
			}
			try {
				db.collection('people').updateOne({first_name: req.body.first_name}, {$set: req.body});
			} catch (err) {
				console.error('Error Inserting. @mongodb');
			}
			db.close();
			return res.sendFile(path.join(__dirname, 'public/index.html'));
		});
	})
	.catch(function (errors) {
		console.log(`${JSON.stringify(req.body)} did not pass validation. @app.put`);
	});
});

app.delete('/edit', function (req, res) {
	if (('first_name' in req.query) && ('last_name' in req.query) && ('affiliation' in req.query) && ('role' in req.query) && ('email' in req.query)) {
		MongoClient.connect(process.env.MONGO_URI, function (err, db) {
			if (err) {
				return console.error('Connection Error. @mongodb');
			}
			db.collection('people').findOneAndDelete(req.query, function (err, res) {
				if (err) {
					return console.error('Error Deleting. @mongodb');
				}
			});
			db.close();
			return res;
		});
	} else {
		console.log(`${JSON.stringify(req.query)} did not pass validation. @app.delete`);
	}
});

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
			db.close();
			return res.json(valid);
		});
	});
});

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
