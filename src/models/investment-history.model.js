/*jshint esversion: 6*/
/*global module, require*/


(function () {
  'use strict';

  // See http://docs.sequelizejs.com/en/latest/docs/models-definition/
  // for more of what you can do here.
  const Sequelize = require('sequelize');
  const CustomDataTypes = require('./dataTypes');
  const app = global.app;

  module.exports = function () {
    const db = app.get('db');
    const investmentHistory = db.define('investment-history', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      player: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiPlayerId: {
        type: Sequelize.STRING
      },
      league: CustomDataTypes.league,
      dateTime: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      fee: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      meleeId: {
        type: Sequelize.INTEGER
      }
    });

    investmentHistory.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return investmentHistory;
  };
}());
