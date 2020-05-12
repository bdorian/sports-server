'use strict';

// instantiate model
const model = require('../models/user.model')();

// oauth related modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config'); // secret

// all user operations
const listUsers = require('../operations/list-users');
const findUser = require('../operations/find-user');
const signUp = require('../operations/sign-up');
const signUp2 = require('../operations/sign-up2');
const login = require('../operations/login');
const forgotPassword = require('../operations/forgot-password');
const setPassword = require('../operations/set-password');
const changePassword = require('../operations/change-password');
const changeEmailEnterCode = require('../operations/change-email-enter-code');
const changeEmailSendPostmark = require('../operations/change-email-send-postmark');
const BaseController = require('./baseController');
const logError = require('../middleware/logErrors');
const errorHandler = require('../middleware/errorHandler');

class UserControllerClass extends BaseController {
	constructor (req, res) {
        super(req, res);
    }

    getPassword () {
        return this.getBodyParam('password');
    }

    getEmail () {
        return this.getBodyParam('email');
    }

    getNewEmail () {
        return this.getBodyParam('newEmail');
    }

    getEmailCode () {
        return this.getBodyParam('emailCode');
    }
    

    // Utility method to list all users. Should be used by admin only
	async listUsers () {
        try {
            let users = await listUsers(model);
            this.res.setHeader('Content-Type', 'application/json');
            this.res.send(JSON.stringify(users));
        } catch(err) {
            logError(err);
            errorHandler(err, this.req, this.res);
        }
    }

    // Sends a sign-up request. The server should send a notification email
    async signUp () {
        var email = this.getEmail();
        if (!email) return this.res.status(400).send("Email was not specified");

        try {
            var user = await signUp(model, email);
            this.res.setHeader('Content-Type', 'application/json');
            //this.res.send(JSON.stringify(user));
            this.res.sendStatus(200);  
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res);
        }
    }

    // Sends a sign-up request with email and password
    async signUp2 () {
        var email = this.getEmail();
        if (!email) return this.res.status(400).send("Email was not specified");

        var password = this.getPassword();
        if (!password) return this.res.status(400).send("Password was not specified");

        try {
            var user = await signUp2(model, email, password);
            this.res.setHeader('Content-Type', 'application/json');
            //this.res.send(JSON.stringify(user));
            this.res.sendStatus(200);  
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res);
        }
    }


    // Authenticates a user and returns a token
    async login () {
        try {
            var email = this.getEmail();
            if (!email) return this.res.status(400).send("Email was not specified");

            var password = this.getPassword();
            if (!password) return this.res.status(400).send("Password was not specified");

            let user = await findUser.byEmail(model, email);
            if (!user) return this.res.status(404).send('No user found.')
            
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return this.res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            user = await login(model, email, token);
            this.res.status(200).send({ auth: true, token: token });
        } catch (err) {
            logError(err);
            this.res.sendStatus(401);
        }
    }

    // Logs out the current user
    async logout () {
        if (!this.user) return this.res.status(401).send("User not authenticated");

        this.user = await logout(model, this.user);

        this.res.status(200).send({ auth: false, token: null });
    }

    
    // Returns the user  for this session
    async myProfile () {
        if (!this.user) return this.res.status(401).send("User not authenticated");

        var profile = {
            'email': this.user.email,
            'lastLogin': this.user.lastLogin ? parseInt(this.user.lastLogin): 0,
            'locked': this.user.locked,
            'balance': this.user.balance,
            'totalGains': this.user.totalGains,
            'totalFees': this.user.totalFees,
            'totalInvested': this.user.totalInvested,
            'isVerified': this.user.isVerified
        }

        this.res.setHeader('Content-Type', 'application/json');
        this.res.status(200).send(JSON.stringify(profile));
    }

    // Sets a new password
    async setPassword () {
        var password = this.getPassword();
        if (!password) return this.res.status(400).send("Password was not specified");

        try {
            this.user = await setPassword(model, this.user, password);
            this.res.sendStatus(200);
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res, undefined, "Cannot set password");
        }
    }

    // Change password
    async changePassword () {
        var oldPassword = this.getPassword();
        if (!oldPassword) return this.res.status(400).send("Old password needed");

        var newPassword = this.getNewPassword();
        if (!newPassword) return this.res.send("New password needed");

        try {
            this.user = await changePassword(model, this.user, oldPassword, newPassword);
            this.res.sendStatus(200);
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res, undefined, "Cannot change password");
        }
    }

    // Resets user's password and emails it
    async forgotPassword () {
        var email = this.getEmail()
        if (!email) return this.res.status(400).send("Email needed");

        //ideally there are more checks for resetting password, so the function doesn't get abused
        try {
            let user = await forgotPassword(model, email);
            this.res.sendStatus(200);
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res, undefined, "Cannot find user " + email);
        }
    }


    async changeEmailSendPostmark () {
        var password = this.getPassword();
        if (!password) return this.res.status(400).send("Password needed");

        var newEmail = this.getNewEmail();
        if (!newEmail) return this.res.status(400).send("New email needed");

        try {
            let user = await changeEmailSendPostmark(model, this.user, newEmail, password);
            this.res.sendStatus(200);
        } catch (err) {
            logError(err);
            this.res.status(400).send("Cannot change email");
        }
    }


    async changeEmailEnterCode () {
        var newEmail = this.getNewEmail();
        if (!newEmail) return this.res.status(400).send("New email needed");

        var emailCode = this.getEmailCode();
        if (!emailCode) return this.res.status(400).send("Email code needed");

        try {
            let user = await changeEmailEnterCode(model, this.user, newEmail, emailCode);
            this.res.sendStatus(200);
        } catch (err) {
            logError(err);
            errorHandler(err, this.req, this.res, undefined, "Cannot change email");
        }
    }

    async updateWithParams () {
        // set parameters on the user model and serialize to the db
    }
}

exports = module.exports = UserControllerClass;
