const assert = require('assert');
const app = require('../../src/app');

describe('\'forgot-password\' service', () => {
  it('registered the service', () => {
    const service = app.service('forgot-password');

    assert.ok(service, 'Registered the service');
  });
});
