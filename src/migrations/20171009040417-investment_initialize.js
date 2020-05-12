/*global module*/


(function () {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
        'investment',
        {
          // Default Sequelize attributes
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE,
            default: Date.now()
          },
          updatedAt: {
            type: Sequelize.DATE,
            default: Date.now()
          },

          // Data model
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
          league: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'league',
              key: 'name'
            }
          },
          amount: {
            type: Sequelize.DOUBLE,
            allowNull: false
          }
        }
      );
    },
    down: function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.dropTable('investment');
    }
  };
}());
