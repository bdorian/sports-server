/*jshint esversion: 6*/
/*global module, require*/

(function () {
  'use strict';
  const sequelize = app.get('db');

  module.exports = async function (model, userId) { // eslint-disable-line no-unused-vars
    const moment = require("moment");
    const currentTime = moment.utc().format('x');

    const result = await sequelize.query('SELECT * FROM getUserMelees(' + userId + ',' + currentTime + ');');
    return result[0];
  };
}());
