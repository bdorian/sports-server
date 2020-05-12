'use strict';

class ValidationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, ValidationError)
  }
}

exports = module.exports = { ValidationError };