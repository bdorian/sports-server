/*jshint esversion: 6*/
/*global describe, it, require*/


(function () {
  'use strict';

  const assert = require('assert');
  const app = require('../../src/app');

  describe('\'populate-daily-nba\' service', () => {
    it('registered the service', () => {
      const service = app.service('populate-daily-nba');

      assert.ok(service, 'Registered the service');
    });
  });
}());
