'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-noop-renderer-server.production.js');
} else {
  module.exports = require('./cjs/proxact-noop-renderer-server.development.js');
}
