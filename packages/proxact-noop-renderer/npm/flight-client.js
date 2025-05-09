'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-noop-renderer-flight-client.production.js');
} else {
  module.exports = require('./cjs/proxact-noop-renderer-flight-client.development.js');
}
