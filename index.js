'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

const app = express();

app.get('/test/:param', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/memberconnect', function (err, db) {
		if (err) {
  	   return console.error('Connection Error. @mongodb');
		}
		db.close();
		console.log(db.collection('people'))
		res.send(simpleStringify(db.collection('people').find()));
	});
});

function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
