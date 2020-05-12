'use strict';

// instantiate model
const model = require('../models/melee.model')();

// all melee operations
const getCurrentFeeRate = require('../operations/get-current-fee-rate');
const getMelees = require('../operations/get-melees');
const getMeleeDetails = require('../operations/get-melee-details');
const sequelize = app.get('db');
const BaseController = require('./baseController');
const Util = require('../operations/util');
const logError = require('../middleware/logErrors');
const errorHandler = require('../middleware/errorHandler');

class MeleeControllerClass extends BaseController {
    constructor (req, res) {
      super(req, res);
    }

    getMeleeId () {
        return this.getBodyParam('meleeId');
    }

    async getMelees () {
        try {
          var userId = this.getUserId();
          if (!userId) return this.res.status(401).send("User not authenticated");
                
          var melees = await getMelees(model, userId);
          
          this.res.setHeader('Content-Type', 'application/json');
          this.res.send(JSON.stringify(new Util().asSeconds(melees, ['openTime', 'startTime'])));
        } catch(err) {
            logError(err);
            errorHandler(err, this.req, this.res);
        }
    }

    async getMeleeDetails () {
      var meleeId = this.getMeleeId();
      if (!meleeId) return this.res.status(400).send("meleeId needed");
      
      var userId = this.getUserId();
      if (!userId) return this.res.status(401).send("User not authenticated");

      try {
        var players = await getMeleeDetails(meleeId, userId);
        // TODO: should do a cross check on investments and add the investment for each player that matches for this user

        this.res.setHeader('Content-Type', 'application/json');
        this.res.send(JSON.stringify(new Util().asSeconds(players, ['meleeOpenTime', 'meleeStartTime', 'gameStartTime'])));
      } catch(err) {
          logError(err);
          errorHandler(err, this.req, this.res);
      }
  }

    // Returns the fee rate for a melee. This is dependent on the start time of the games
    async getCurrentFeeRate () {
        var meleeId = this.getMeleeId();
        if (!meleeId) return this.res.status(400).send("meleeId needed");
      
        var currentFeeRate = await getCurrentFeeRate(model, meleeId);

        this.res.setHeader('Content-Type', 'application/json');
        this.res.send(JSON.stringify(currentFeeRate));      
    }
}

exports = module.exports = MeleeControllerClass;
