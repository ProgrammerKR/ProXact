'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-debug-tools.production.js');
} else {
  module.exports = require('./cjs/proxact-debug-tools.development.js');
}
