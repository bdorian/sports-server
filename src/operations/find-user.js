

  'use strict';

  module.exports.byEmail = async function (model, email) {
    let user = await model.findOne({where: {email: email}});
    return user;
  }

  module.exports.byId = async function (model, id) {
    let user = await model.findOne({where: {id: id}});
    return user;
  }
  
