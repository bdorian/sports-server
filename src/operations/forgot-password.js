module.exports = async function (model, email) { // eslint-disable-line no-unused-vars
  var findUser = require('./find-user');
  var user = await findUser.byEmail(model, email);

  // if user found, set new password and notify the user
  if (user) {
    // reset password
    const crypto = require('crypto');
    var tempPassword = Math.random(crypto.randomBytes(64)).toString(36).slice(2).toUpperCase();
    
    const bcrypt = require('bcryptjs');
    var hashedPassword = bcrypt.hashSync(tempPassword, 8);

    // save hashed password
    user = await model.update({'password': hashedPassword}, {where: {'email': email} });
  
    // send new password (un-hashed)
    user = await sendEmailWithPassword(email, tempPassword);

    return user;
  } else {
    throw new Error('Cannot reset password');
  }
}

async function sendEmailWithPassword (email, tempPassword) {

  const postmark = require("postmark");
  const server_key = '49dd1b43-ee30-482d-81fa-1d12d056eb5b';
  const postmarkClient = new postmark.Client(server_key);
  const config = require("config");
  const templateId =  config.has('postmarkTemplateIds') ? config.get('postmarkTemplateIds').forgotPasswordExistingUser : 8264444;

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

