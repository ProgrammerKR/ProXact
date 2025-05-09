'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-client-flight.production.js');
} else {
  module.exports = require('./cjs/proxact-client-flight.development.js');
}
