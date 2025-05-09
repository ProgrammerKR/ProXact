'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-server-flight.production.js');
} else {
  module.exports = require('./cjs/proxact-server-flight.development.js');
}
