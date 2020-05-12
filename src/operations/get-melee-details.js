/*jshint esversion: 6*/
/*global module, require*/

(function () {
  'use strict';
  const sequelize = app.get('db');

  module.exports = async function (meleeId, userId) { // eslint-disable-line no-unused-vars
    var result = await sequelize.query('SELECT * FROM getUserInvestments(' + userId + ',' + meleeId + ');');
    return result[0];
  };
}());