

  'use strict';

  module.exports = async function (model) {
      let users =  model.findAll();
      return users;
    }
  
