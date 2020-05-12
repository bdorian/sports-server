/*global module*/


(function () {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('player', {
        // Default Sequelize attributes
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,

        // Data Model
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        apiPlayerId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        league: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'league',
            key: 'name'
          }
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false
        },
        apiTeamId: {
          type: Sequelize.STRING,
          allowNull: false
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
          type: Sequelize.STRING,
          allowNull: true
        },
        meleeStartTime: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gameStartTime: {
          type: Sequelize.STRING,
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
    },
    down: function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.dropTable('player');
    }
  };
}());
