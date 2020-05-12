/*jshint esversion: 6*/
/*global module, require*/

(function () {
    'use strict';
  
    const Sequelize = require('sequelize');
    const Errors = require('../errors');
    module.exports = async function (userModel, investmentModel, user, meleeId) {
      return await investmentModel.sum('amount', {
          where: {
            userId: user.id,
            meleeId: meleeId
          }
        });
    }
  }());