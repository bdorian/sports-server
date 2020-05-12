/**
 *  Routes
 */

 'use strict';
 
//module.exports = function() {
const express = require('express')
const router = express.Router();

// Separate UI vs API's. This helps creating a simple UI (maybe served from /public)
router.use('/v1', require('./api'));
//router.use('/', require('./ui'));

module.exports = router;
