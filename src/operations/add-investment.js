/*jshint esversion: 6*/
/*global module, require*/

(function () {
    'use strict';
  
    const Sequelize = require('sequelize');
    const Errors = require('../errors');
    const moment = require('moment');
    
    module.exports = async function (userModel, investmentModel, investmentHistoryModel, player, user, amountIncrement, fee, transaction) {
      var result = await investmentModel.findOne({
          where: {
            userId: user.id,
            playerId: player.id
          }
        });
  
      // Validation: sufficient funds available
      var balance = user.balance;
      var totalInvestments = await investmentModel.sum('amount', { where: { userId: user.id } }) || 0;
   
      if (amountIncrement <= 0)
        throw new Errors.ValidationError("You can only increase your investment, not reduce it.");

      fee = fee * amountIncrement;
      var amount = result ? amountIncrement + result.amount : amountIncrement;

      if (balance < totalInvestments + amountIncrement + fee)
        throw new Errors.ValidationError("Insuficient funds. Funds available are: " + parseFloat(balance - totalInvestments - fee).toFixed(2));

      var promiseResult = [];
      var playerName = player.firstName + ' ' + player.lastName;
      var league = player.league;
  
      if(result) promiseResult.push(result.updateAttributes({
          amount: amount
        }, { transaction: transaction })); 
      else promiseResult.push(investmentModel.create({
        userId: user.id,
        playerId: player.id,
        meleeId: player.meleeId,
        league: league,
        amount: amount
        }, { transaction: transaction })); 
          
      promiseResult.push(investmentHistoryModel.create({
        userId: user.id,
        meleeId: player.meleeId,
        player: playerName,
        apiPlayerId: player.apiPlayerId,
        dateTime: moment.utc().format('x'),
        league: league,
        amount: -amountIncrement,
        fee: -fee,
        balance: balance - amountIncrement - fee
      }, { transaction: transaction }));
  
      promiseResult.push(userModel.decrement({ balance: amountIncrement + fee }, 
        { where: { id: user.id } , transaction: transaction  }));
    
      return Promise.all(promiseResult);
    }
  }());