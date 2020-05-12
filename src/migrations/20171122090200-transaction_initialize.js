/*global module*/


(function () {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('transaction', {
        // Default Sequelize attributes
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,

        // Data Model
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          }
        },
        dateTime: {
          type: Sequelize.STRING,
          allowNull: false
        },
        amount: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        balance: {
          type: Sequelize.DOUBLE,
          allowNull: false
        }
      });
    },
    down: function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.dropTable('transaction');
    }
  };
}());
