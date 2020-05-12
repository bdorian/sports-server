/*jshint esversion: 6*/
/*global console, module, require*/


const Sequelize = require('sequelize');

module.exports = function () {
  const app = global.app;

  // TODO should get it from the config file
  const config = require("config");

  const connectionString = process.env['DATABASE_URL'] ?  process.env['DATABASE_URL'] : 
                          (config.has('postgres') ? config.get('postgres') : 'postgres://fsm:fsm@localhost:5432/fsm_server');

  const Op = Sequelize.Op;
  const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
  };
  
  const db = new Sequelize(connectionString, {
    dialect: 'postgres',
    operatorsAliases: operatorsAliases,
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    },
    logging: console.log,
    define: {
      freezeTableName: true,
      timestamps: false
    }
  });
  
  app.set('db', db);
 
  // setup models
  // Set up data relationships
  const models = db.models;
  Object.keys(models).forEach(name => {
    if ('associate' in models[name]) {
      models[name].associate(models);
    }
  });

  // Sync to the database
  db.sync();

  /*
  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
  */
};
