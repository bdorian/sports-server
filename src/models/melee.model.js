/*jshint esversion: 6*/
/*global module, require*/


(function () {
  'use strict';

  const Sequelize = require('sequelize');
  const CustomDataTypes = require('./dataTypes');
  const Enums = require('./enums')
  const app = global.app;

  module.exports = function () {
    const db = app.get('db');
    const melee = db.define('melee-current', {
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      league: CustomDataTypes.league,
      openTime: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      startTime: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      totalInvestment: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
      activePlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      investedPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: CustomDataTypes.meleeStatus
    });

    melee.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return melee;
  };
}());
