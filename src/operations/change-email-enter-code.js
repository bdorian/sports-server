module.exports = async function (model, userId, newEmail, emailCode) { // eslint-disable-line no-unused-vars
  var user = await model.findOne({where: {'id': userId}});

  // if user found, set new email
  if (user && user.emailCode == emailCode) {
    // send code to new email
    user = await model.update({'email': newEmail}, {where: {'id': userId} });
    return user;
  } else {
    throw new Error('Cannot change email');
  }
}

