module.exports = async function (model, user, password) { // eslint-disable-line no-unused-vars

    const bcrypt = require('bcryptjs');
    var hashedPassword = bcrypt.hashSync(password, 8);

    // save hashed password
    user = await model.update({'password': hashedPassword}, {where: {'id': user.id} });

    return user;
}

