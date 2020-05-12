
(function() {
    'use strict';
  
    module.exports = async function (model, email, password) { // eslint-disable-line no-unused-vars
      var findUser = require('./find-user');
      var user = await findUser.byEmail(model, email);

      //const crypto = require('crypto');
      //var tempPassword = Math.random(crypto.randomBytes(64)).toString(36).slice(2).toUpperCase();

      // if new user, create one
      if (!user) 
        //user = await addUser(model, email, tempPassword);
        user = await addUser(model, email, password);

        // later, may want to send a validation email to confirm the registration
     /*
      // if this is a new user, send confirmation email
      if (!user.lastLogin) { //if (!user.isVerified) {
          await sendEmailWithPassword(email, tempPassword);
          return user;
      } else {
        throw new Error("user already signed up");
      }
      */
    }

    async function addUser (model, email, password) {
      const bcrypt = require('bcryptjs');
      var hashedPassword = bcrypt.hashSync(password, 8);

      const moment = require('moment');
      var now = moment.utc().format('x');
        
      // create the user with the lastLogin = null
      return model.create(
        {
          'email': email, 
          'password': hashedPassword, 
          'createdDate': now, 
          'isVerified':false
        });
    }

    async function sendEmailWithPassword (email, tempPassword) {

      const postmark = require("postmark");
      const server_key = 'baa9109c-d187-4ed1-9a31-8f72af67bdba';
      const postmarkClient = new postmark.Client(server_key);
      const config = require("config");
      const templateId =  config.has('postmarkTemplateIds') ? config.get('postmarkTemplateIds').welcomeTempPassword : 3751227;
    
      const emailSent = await postmarkClient.sendEmailWithTemplate({
        'To': email,
        'From': 'Fantasy Sports Melees <info@fsmelees.com>',
        'TemplateId': templateId,
        'TemplateModel': {
          'companyName': 'Fantasy Sports Melees',
          'primaryColour': '#ff9800',
          'secondaryColour': '#ff9800',
          'domain': 'fsmelees.com',
          'companyAddress': 'companyAddress_Value',
          'tempPassword': tempPassword
        }
      });
    
    };
    
  }());
  