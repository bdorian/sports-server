const assert = require('assert');
const app = require('../../src/app');

describe('\'update-game-nba\' service', () => {
  it('registered the service', () => {
    const service = app.service('update-game-nba');

    assert.ok(service, 'Registered the service');
  });
});
