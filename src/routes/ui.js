'use strict';

const express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res) {
    res.redirect('../public/index.html');
});

module.exports = router;