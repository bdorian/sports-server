/*jshint esversion: 6*/
/*eslint no-console: 0*/
/*global console, module, process, require, setInterval*/


(function () {
  'use strict';

  const logger = require('winston');
  const app = require('./app');
  const port = app.get('port');
  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error(
      'Unhandled Rejection at: Promise ',
      p,
      reason
    )
  );

  // Start Server
  server.on('listening', () =>
    logger.info(
      'Feathers application started on http://%s:%d',
      app.get('host'),
      port
    )
  );

  // Polling for Updates - dont poll if localhost
  if (app.get('host') !== 'localhost') {
    const updateGameNflService = app.service('update-game-nfl');
    const updateGameNbaService = app.service('update-game-nba');
    setInterval(() => {
      updateGameNflService.find({
        paginate: false
      }).then(() => {
        return updateGameNbaService.find({
          paginate: false
        });
      }).catch(err => {
        console.log('Error in polling loop: ' + err); 
      });
    }, 300000);
  }
}());
