var request = require('request');
var rpErrors = require('request-promise/errors')

module.exports = function requestPromiseStream(uri, requestOptions) {
  return new Promise(function (resolve, reject) {
    var req = request(uri, requestOptions);
    req.on('error', reject);
    req.on('response', function (res) {
      // pause the stream so that it isn't flowing during the async promise hop
      res.pause();
      if (requestOptions.simple !== false) {
        resolve(res);
      }
      if (res.statusCode !== 200) {
        if (typeof res.body === 'undefined') {
          req.on('complete', function (res) {
            return reject(new rpErrors.StatusCodeError(res.statusCode, res.body));
          });
          req.readResponseBody(res);
          return;
        }
        return reject(new rpErrors.StatusCodeError(res.statusCode, res.body));
      }
      resolve(res);
    });
  });
};