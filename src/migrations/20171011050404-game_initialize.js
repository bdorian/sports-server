/*global module*/


(function () {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
        'game',
        {
          // Default Sequelize attributes
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,

          // Data Model
          league: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'league',
              key: 'name'
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
          apiEventId: {
            type: Sequelize.STRING,
            allowNull: false
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
      );
    },
    down: function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.dropTable('game');
    }
  };
}());
