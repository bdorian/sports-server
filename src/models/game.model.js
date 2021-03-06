/*jshint esversion: 6*/
/*global module, require*/


(function () {
  'use strict';

  // See http://docs.sequelizejs.com/en/latest/docs/models-definition/
  // for more of what you can do here.
  const Sequelize = require('sequelize');
  const CustomDataTypes = require('./dataTypes');
  const DataTypes = Sequelize.DataTypes; //eslint-disable-line no-unused-vars
  const app = global.app;

  module.exports = function () {
    const db = app.get('db');
    const game = db.define(
      'game',
      {
        meleeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'melee',
            key: 'id'
          }
        },
        league: CustomDataTypes.league,
        apiEventId: {
          type: Sequelize.STRING,
          allowNull: true
        },
        apiTeamHomeId: {
          type: Sequelize.STRING,
          allowNull: true
        },
        apiTeamAwayId: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: CustomDataTypes.meleeStatus
      }
    );

    game.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return game;
  };
}());
