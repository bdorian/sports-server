'use strict';

module.exports = async function (model, email, auth0Id) {
  // The actual login is done in done with oauth2, here we just update the db with the login timestamp and id
  const moment = require('moment');
  var now = moment.utc().format('x');

  let user = await model.update({'lastLogin': now, 'auth0Id': auth0Id}, {where: {'email': email} });
    
  return user;
};