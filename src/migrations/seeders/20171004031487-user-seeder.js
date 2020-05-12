/*jshint esversion: 6*/
/*global module, require*/


(function () {
  'use strict';

  const moment = require('moment');
  const today = moment.utc();

  module.exports = {
    'up': function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.bulkInsert(
        'user',
        [
          // Admin Users
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'admin@admin.admin',
            'password': '$2a$12$12CIaVkr4HZTlAu4e.YPbu07ta5MBZfW7sEfMIJIROzMZHfltM/Ny',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': true,
            //'isVerified': false
          },
          // Non-Admin Users
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'a@a.a',
            'password': '$2a$12$aOPUpbfmaGygMuoBppfpfepcaSSThVFaRZdmddyd3g7vna9FDlLM2',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': false,
            //'isVerified': false
          },
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'b@b.b',
            'password': '$2a$12$8nLMfm.qSr9QMArp72IwhekMdBa4PTv28SwYOQfOmr601qUNStAI.',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': false,
            //'isVerified': false
          },
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'c@c.c',
            'password': '$2a$12$/ikimZB53rk.ZLSyUdkxSuQ27rFfv6oacs/DX.AspRXepYzDE2Quy',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': false,
            //'isVerified': false
          },
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'd@d.d',
            'password': '$2a$12$UqKlcnoQZCfAN/6VpuuoXOBKnasYfmCJ.xkAIoVbIs6we/M/Pq0q2',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': false,
            //'isVerified': false
          },
          {
            'createdAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'updatedAt': today.format('YYYY-MM-DD HH:mm:ss'),
            'email': 'e@e.e',
            'password': '$2a$12$hXAY8A..8SaBnl0B2c1L3ujvV3MR.VCbDgzA1pD3j0MXW7wkp16Fy',
            'createdDate': today.format('x'),
            'lastLogin': today.format('x'),
            //default values
            //'locked': false,
            //'balance': 0.0,
            //'totalGains': 0.0,
            //'totalFees': 0.0,
            //'totalInvested': 0.0,
            'isAdmin': false,
            //'isVerified': false
          }
        ]
      );
    },
    'down': function (queryInterface, Sequelize) { //eslint-disable-line no-unused-vars
      return queryInterface.bulkDelete(
        'user',
        [
          {
            'email': 'admin@admin.admin'
          },
          {
            'email': 'a@a.a'
          },
          {
            'email': 'b@b.b'
          },
          {
            'email': 'c@c.c'
          },
          {
            'email': 'd@d.d'
          },
          {
            'email': 'e@e.e'
          }
        ]
      );
    }
  };
}());
