module.exports = async function (model, user, newEmail, password) { // eslint-disable-line no-unused-vars

  // if user found, create email code and send to new email
  if (user) {
    const bcrypt = require('bcryptjs');

    // is old password correct ?
    if (!bcrypt.compareSync(password, user.password)) 
      throw new Error("Old password does not match");

    const crypto = require('crypto');
    const tempCode = Math.random(crypto.randomBytes(64)).toString(36).slice(6).toUpperCase();

    // send code to new email
    user = await sendEmailWithCode(newEmail, tempCode);

    // set the code to compare later
    user = await model.update({'emailCode': tempCode}, {where: {'email': email} });

    return user;
  } else {
    throw new Error('Cannot reset password');
  }
}

async function sendEmailWithCode (newEmail, tempCode) {

  const postmark = require("postmark");
  const server_key = 'baa9109c-d187-4ed1-9a31-8f72af67bdba';
  const postmarkClient = new postmark.Client(server_key);

  const config = require("config");
  const templateId =  config.has('postmarkTemplateIds') ? config.get('postmarkTemplateIds').changeEmail : 3751682;

  const emailSent = await postmarkClient.sendEmailWithTemplate({
    'To': newEmail,
    'From': 'Fantasy Sports Melees <info@fsmelees.com>',
    'TemplateId': templateId,
    'TemplateModel': {
      'companyName': 'Fantasy Sports Melees',
      'primaryColour': '#ff9800',
      'secondaryColour': '#ff9800',
      'domain': 'fsmelees.com',
      'companyAddress': 'companyAddress_Value',
      'tempCode': tempCode
    }
  });

};
