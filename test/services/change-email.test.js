const assert = require('assert');
const app = require('../../src/app');

describe('\'change-email\' service', () => {
  it('registered the service', () => {
    const service = app.service('change-email');

    assert.ok(service, 'Registered the service');
  });
});
