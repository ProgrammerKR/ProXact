'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-test-renderer.production.js');
} else {
  module.exports = require('./cjs/proxact-test-renderer.development.js');
}
