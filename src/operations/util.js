'use strict';

class Util {
  groupBy (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  castToInt(array, properties) {
    var cast = function(x, properties) {
      var result = {};
      properties.forEach(property => {
        result[property] = parseInt(x[property]);
      });
      return result;
    }
    return array.map(x => Object.assign(x, cast(x, properties)));
  }

  asSeconds(array, properties) {
    var cast = function(x, properties) {
      var result = {};
      properties.forEach(property => {
        result[property] = parseInt(x[property]/1000);
      });
      return result;
    }
    return array.map(x => Object.assign(x, cast(x, properties)));
  }
}

exports = module.exports = Util;