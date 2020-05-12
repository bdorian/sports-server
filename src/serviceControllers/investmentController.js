'use strict';

const Errors = require('../errors');

// instantiate model
const userModel = require('../models/user.model')();
const meleeModel = require('../models/melee.model')();
const playerModel = require('../models/player.model')();
const investmentModel = require('../models/investment.model')();
const investmentHistoryModel = require('../models/investment-history.model')();
const meleeStatus = require('../models/enums').meleeStatus;

// all player operations
const moment = require('moment');
const sequelize = app.get('db');
const BaseController = require('./baseController');
const Util = require('../operations/util');
const getCurrentFeeRate = require('../operations/get-current-fee-rate');
const addInvestment = require('../operations/add-investment');
const investmentHistory = require('../operations/get-investment-history');
const getTotalInvested = require('../operations/get-total-invested');
const logError = require('../middleware/logErrors');
const errorHandler = require('../middleware/errorHandler');

class InvestmentControllerClass extends BaseController {
  constructor (req, res) {
    super(req, res);
  }

  getLeague () {
    var league = this.getBodyParam('league');
    
    if (league) league = league.toUpperCase();
    return league;
  }

  getMeleeId () {
    return this.getBodyParam('meleeId');
  }

  getPlayerId () {
    return this.getBodyParam('playerId');
  }

  getInvestmentAmount() {
    return parseFloat(this.getBodyParam('amount'));
  }

  getFee () {
    return this.getBodyParam('feeRate');
  }

  async addInvestment() {
    var playerId = this.getPlayerId();
    if (!playerId) return this.res.status(400).send("Player was not specified");

    // this is the additional investment on the player
    var amount = this.getInvestmentAmount();
    if (!amount) return this.res.status(400).send("Amount was not specified");

    var userId = this.getUserId();
    if (!userId) return this.res.status(401).send("User not authenticated");

    var gameFee = this.getFee();
    if (!gameFee) return this.res.status(400).send("Fee not specified ="); // could also use current fee

    try {
      await sequelize.transaction(async (transaction) => {
        var player = await playerModel.findOne({
          where: {
            id: playerId
          }
        });

        var melee = await meleeModel.findOne({
          where: {
            id: player.meleeId
          }
        });

        if (melee.status != meleeStatus.Pre)
          return this.res.status(400).send("Cannot make an investment at this time");

        var result = await getCurrentFeeRate(meleeModel, player.meleeId);
        var fee = result.fee;
        
        // TODO: return the fee properly
        if (gameFee != fee) return this.res.status(400).send("Fee changed to " + fee);
        
        result = await addInvestment(userModel, investmentModel, investmentHistoryModel, player, this.user, amount, fee, transaction);
        this.user = result[result.length - 1][0][0][0];

        var profile = {
          'email': this.user.email,
          'lastLogin': this.user.lastLogin ? parseInt(this.user.lastLogin): 0,
          'locked': this.user.locked,
          'balance': this.user.balance,
          'totalGains': this.user.totalGains,
          'totalFees': this.user.totalFees,
          'totalInvested': this.user.totalInvested,
          'isVerified': this.user.isVerified
        }

        this.res.setHeader('Content-Type', 'application/json');
        this.res.status(200).send(JSON.stringify(profile));
      });
    } catch(err) {
      logError(err);
      errorHandler(err, this.req, this.res, undefined, "Could not save investment");
    }
  }

  async investmentHistory() {
    if (!this.user) return this.res.status(401).send("User not authenticated");

    try {
      var investments = await investmentHistory(userModel, investmentHistoryModel, this.user);
      
      this.res.setHeader('Content-Type', 'application/json');
      this.res.status(200).send(JSON.stringify(new Util().asSeconds(investments, ['dateTime'])));

    } catch(err) {
      logError(err);
      errorHandler(err, this.req, this.res, undefined, "Could not get investment history");
    }
  }

  async getTotalInvested() {
    if (!this.user) return this.res.status(401).send("User not authenticated");

    var meleeId = this.getMeleeId();
    if (!meleeId) return this.res.status(400).send("Melee was not specified");

    try {
      var totalInvested = await getTotalInvested(userModel, investmentModel, this.user, meleeId);
      
      this.res.setHeader('Content-Type', 'application/json');
      this.res.status(200).send(JSON.stringify({ 'totalInvested': totalInvested }));

    } catch(err) {
      logError(err);
      errorHandler(err, this.req, this.res, undefined, "Could not get total invested");
    }
  }
}

exports = module.exports = InvestmentControllerClass;