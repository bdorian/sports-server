/*jshint esversion: 6*/
/*global module, require*/


(function () {
  'use strict';

  // See http://docs.sequelizejs.com/en/latest/docs/models-definition/
  // for more of what you can do here.
  const Sequelize = require('sequelize');
  const app = global.app;

  module.exports = function () {
    const db = app.get('db');
    const user = db.define(
      'user',
      {
        // Feathers Authentication fields
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
          type: Sequelize.BIGINT,
          allowNull: true
        },
        lastLogin: {
          type: Sequelize.BIGINT,
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

    user.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return user;
  };
}());
