const assert = require('assert');
const app = require('../../src/app');

describe('\'sign-up\' service', () => {
  it('registered the service', () => {
    const service = app.service('sign-up');

    assert.ok(service, 'Registered the service');
  });
});
