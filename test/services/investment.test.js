const assert = require('assert');
const app = require('../../src/app');

describe('\'investment\' service', () => {
  it('registered the service', () => {
    const service = app.service('investment');

    assert.ok(service, 'Registered the service');
  });
});
