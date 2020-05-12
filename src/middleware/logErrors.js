'use strict';

 // log errors
 module.exports = function (err, req, res, next) {
     console.error('[' + new Date() + ']\n' + err.stack);
     if (next) next(err);
 }