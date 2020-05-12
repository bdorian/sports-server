/*jshint esversion: 6*/
/*global module, require*/

(function () {
  'use strict';

  module.exports = async function (meleeModel, meleeId) { // eslint-disable-line no-unused-vars
    const moment = require('moment');
    var melee = await meleeModel.findById(meleeId);
    let diffTime = melee.startTime - moment.utc().format('x');

    var result = {};
    result.fee = 0;

    if (diffTime > (3600000*3)) {
      result.fee = 0;
    } else if (diffTime > (3600000*2)) {
      result.fee = 0.01;
    } else if (diffTime > (3600000*1)) {
      result.fee = 0.02;
    } else if (diffTime > (3600000*0)) {
      result.fee = 0.03;
    }

    return result;
  };
}());
