'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-dom-test-utils.production.js');
} else {
  module.exports = require('./cjs/proxact-dom-test-utils.development.js');
}
