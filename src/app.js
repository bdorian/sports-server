/*jshint esversion: 6*/
/*global module, require*/


'use strict';

// app.js

// Module dependencies
const express = require('express'); 
const config = require('config');
const errorLog = require('./middleware/logErrors');
const errorHandler = require('./middleware/errorHandler');
const http = require('http');
const https = require('https');
const fs = require('fs');

// Create the application server
const app = module.exports = express();

// Set some global objects
global.app = app;
global.config = config;

/*
* Configuration
*/

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: false}));    // to support URL-encoded bodies

//app.use(express.static(__dirname + '/public')); // serve static files from the public folder: images, etc.
app.use(express.static('public'))
app.disable('x-powered-by');

// Database - sequelize
global.db = require('./sequelize')();

// Resource Routers to API's and UI
app.use('/', require('./routes/routes'));

app.use(errorLog);
app.use(errorHandler);

process.on('unhandledRejection', error => {
  errorLog(error);
});

// Set certificate
var options = {
  key: fs.readFileSync('resources/server.key'),
  cert: fs.readFileSync('resources/server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};


// start the server
const PORT = config.has('port') ? config.get('port') : 3030 ; // should be 9443 
http.createServer(app).listen(PORT, () => console.log("listening on port " + PORT));
https.createServer(options, app).listen(9443, () => console.log("listening on port " + 9443));