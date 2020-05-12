'use strict';

module.exports = async function (model, user) {

  // The actual login is done in done with oauth2, here we just update the db with the login timestamp and id

  let user = await model.update({'token': ''}, {where: {id: user.id} });
    
  return user;
}