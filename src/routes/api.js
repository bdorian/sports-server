'use strict';

const express = require('express');
var router = express.Router();

const app = global.app;

// a middleware with no mount path; gets executed for every request to the app
router.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// controllers to call when implementing services. 
// controllers will interact with the models to read/write to the database
const userController = require('../serviceControllers/userController'); //class
const meleeController = require('../serviceControllers/meleeController'); //class
const investmentController = require('../serviceControllers/investmentController');

// middleware to force authentication for API's and set the current user in the request data
const authCheck = require('../middleware/auth');

router.get('/', (req, res) => {
    res.send("hello !");
});


/*
 * POST /sign-up {:email} 
 * Sends a sign-up request. The server should send a notification email
 */
router.post('/sign-up', (req, res) => {
    (new userController(req, res)).signUp();
}); 

/*
 * POST /sign-up2 {:email,  :password} 
 * Sends a sign-up request. The admin will need to validate the user eventually.
 */
router.post('/sign-up2', (req, res) => {
    (new userController(req, res)).signUp2();
}); 

/*
 * POST /login {:email,  :password} 
 * Authenticates a user and returns a token
 */
router.post('/login', (req, res) => {
    (new userController(req, res)).login();
});

/*
 * POST /logout
 * Logs out the current user
 */
router.post('/logout', authCheck, (req, res) => {
    (new userController(req, res)).logut();
}); 

/*
 * POST /user
 * Returns the user id for this session
 */
router.get('/user', authCheck, (req, res) => {
    (new userController(req, res)).myProfile();
});

/*
 * POST /user
 * Returns the user id for this session
 */
router.post('/user', authCheck, (req, res) => {
    (new userController(req, res)).myProfile();
});

/*
 * POST /set-password { :password}
 * Sets a new password
 */
router.post('/set-password', authCheck, (req, res) => {
    (new userController(req, res)).setPassword();
});

/*
 * POST /change-password { :password, :newPassword}
 * Change current password
 */
router.post('/change-password', authCheck, (req, res) => {
    (new userController(req, res)).changePassword();
});

/*
 * POST /forgot-password {:email}  
 * TODO: should probably have more info in addition to email
 * Resets user's password and emails it
 */
router.post('/forgot-password', (req, res) => {
    (new userController(req, res)).forgotPassword();
}); 


/*
 * POST /change-email {:newEmail, :password }
 */
router.post('/change-email-send-postmark', authCheck, (req, res) => {
    (new userController(req, res)).changeEmailSendPostmark();
});

/*
 * POST /change-email {:newEmail,  :emailCode }
 */
router.post('/change-email-enter-code', authCheck, (req, res) => {
    (new userController(req, res)).changeEmailEnterCode();
}); 

/*
 * POST /melee/all
 * Returns all the melees for all the leagues the client can select
 */
router.post('/melee/all', authCheck, (req, res) => {
    (new meleeController(req, res)).getMelees();
});

/*
 * POST /melee {:meleeId}
 * Get all the players of the specified meleeId
 */
router.post('/melee', authCheck, (req, res) => {
    (new meleeController(req, res)).getMeleeDetails();
});

/*
 * POST /melee/currentFeeRate {:meleeId}
 * returns the current fee rate
 */
router.post('/melee/currentFeeRate', (req, res) => {
    (new meleeController(req, res)).getCurrentFeeRate();
});

/*
 * POST /investment/add {:playerId, :amount, :feeRate }
 * Add to user's investment on a player
 */
router.post('/investment/add', authCheck, (req, res) => {
    (new investmentController(req, res)).addInvestment();
});

/*
 * POST /investment/history
 * Add to user's investment on a player
 */
router.post('/investment/history', authCheck, (req, res) => {
    (new investmentController(req, res)).investmentHistory();
});

/*
 * POST /investment/totalInvested
 * Get user's investment for a melee
 */
router.post('/investment/totalInvested', authCheck, (req, res) => {
    (new investmentController(req, res)).getTotalInvested();
});

module.exports = router;