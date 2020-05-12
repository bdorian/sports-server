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
    const investment = db.define('investment', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'player',
          key: 'id'
        }
      },
      meleeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'melee',
          key: 'id'
        }
      },
      league: CustomDataTypes.league,
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });

    investment.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return investment;
  };
}());
