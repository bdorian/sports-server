'use strict';

var rp = require('request-promise');

const pgrun = require ('./src/runDbScript');
var dbConnection = {
    host: 'localhost',
    port: 5432,
    database: 'fsm_server',
	user: 'admin',
    password: 'admin'
};
const baseUrl = 'http://localhost:3030/v1/';
var options = {
    method: 'POST',
    uri: baseUrl + 'feed/daily',
    body: {
        league: 'nba'
    },
    json: true, // Automatically stringifies the body to JSON
    gzip: true
};

(async function() {
    // add users
    await pgrun(dbConnection, './src/database/populateDb.sql');
    
    var result;
    try {
        result = await rp(options);
        console.log('Downloaded NBA games.');
        console.log(result);
    } catch(e) {
        //console.log(e);
        return;
    }

    // populate transactions
    //await pgrun(dbConnection, './src/database/mock_addUserTransactions.sql');

    // set players projections
    await pgrun(dbConnection, './src/database/mock_setPlayersProjection.sql');
/*
    try {
        options.uri = baseUrl + 'feed/game';
        result = await rp(options);
        console.log('Updated NBA games results.');
        console.log(result);
    } catch(e) {
        //console.log(e);
        return;
    }*/
})();