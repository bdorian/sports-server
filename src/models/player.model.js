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
    const player = db.define('player-current', {
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      apiPlayerId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      league: CustomDataTypes.league,
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiTeamId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      team: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meleeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'melee',
          key: 'id'
        }
      },
      meleeOpenTime: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      meleeStartTime: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      isPlayingHome: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      vsTeam: {
        type: Sequelize.STRING,
        allowNull: true
      },
      projection: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      totalInvestment: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      performance: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      roi: {
        type: Sequelize.DOUBLE,
        allowNull: true
      }
    });

    player.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return player;
  };
}());
