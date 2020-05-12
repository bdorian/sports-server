const assert = require('assert');
const app = require('../../src/app');

describe('\'update-game-nfl\' service', () => {
  it('registered the service', () => {
    const service = app.service('update-game-nfl');

    assert.ok(service, 'Registered the service');
  });
});
