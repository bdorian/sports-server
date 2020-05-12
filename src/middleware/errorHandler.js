'use strict';

module.exports = function (err, req, res, next, message) {    
    var status = 400;
    
    if (err.name) {
        if (err.name == 'SequelizeValidationError') {
            return res.status(status).json({
                type: 'DatabaseError',
                message: message,
                details: JSON.stringify(err.errors)
            });
        } 
    }

    return res.status(status).json({
        type: 'Error',
        message: (message || '') + ' ' + err.message
    });
};