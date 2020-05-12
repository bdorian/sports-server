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
    const transaction = db.define('transaction', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      dateTime: {
        type: Sequelize.BIGINT,
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

    transaction.associate = function (models) { // eslint-disable-line no-unused-vars
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return transaction;
  };
}());
