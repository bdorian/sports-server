/*global module*/


(function () {
  'use strict';

  module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
        'user',
        {
          // Default Sequelize values
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,

          // Authentication
          email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
          },
          password: {
            type: Sequelize.STRING,
            allowNull: true
          },
          auth0Id: {
            type: Sequelize.STRING
          },

          // Data Model
          createdDate: {
            type: Sequelize.STRING,
            allowNull: true
          },
          lastLogin: {
            type: Sequelize.STRING,
            allowNull: true
          },
          locked: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
          },
          balance: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
          },
          totalGains: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
          },
          totalFees: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
          },
          totalInvested: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
          },
          isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          isVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          emailCode: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
          }
        }
      );
    },
    down: function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.dropTable('user');
    }
  };
}());
