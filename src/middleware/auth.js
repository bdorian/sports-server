'use strict';

 // Validates that the request comes from an authenticated user and puts the user into the request chain .
 // The application router need to include this function whenever authentication is needed prior to handling a request
 module.exports = async function (req, res, next) {
    // oauth related modules
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const config = require('../config'); // secret
    const findUser = require('../operations/find-user');
    const userModel = require('../models/user.model')();

    var token;
    if( req.hasOwnProperty('headers')) {
        if (req.headers.hasOwnProperty('authorization')) {
        token = req.headers['authorization'];
        } else if (req.headers.hasOwnProperty('x-access-token')) {
        token = req.headers['x-access-token'];
        } 
    } 

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, async function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = await findUser.byId(userModel, decoded.id);  // from the decoded signed payload

        if (!req.user) 
            return res.status(401).send({ auth: false, message: 'Unauthorized user' });
        else
            next();
    });
}