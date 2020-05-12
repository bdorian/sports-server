/*jshint esversion: 6*/
/*global module, require*/

(function () {
    'use strict';
  
    const Sequelize = require('sequelize');
    const Errors = require('../errors');
    const moment = require('moment');
    module.exports = async function (userModel, investmentHistoryModel, user) {
      return await investmentHistoryModel.findAll({
          where: {
            userId: user.id,
          }
        });
    }
  }());