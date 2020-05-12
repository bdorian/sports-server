module.exports = async function (model, user, oldPassword, newPassword) { // eslint-disable-line no-unused-vars

  // if user found, set new password
  if (user) {
   
    const bcrypt = require('bcryptjs');

    // is old password correct ?
    if (!bcrypt.compareSync(oldPassword, user.password)) 
      throw new Error("Old password does not match");

    var hashedPassword = bcrypt.hashSync(newPassword, 8);

    // save hashed password
    user = await model.update({'password': hashedPassword}, {where: {'email': email} });
    return user;
  } else {
    throw new Error('Cannot reset password');
  }
}

