'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-refresh-runtime.production.js');
} else {
  module.exports = require('./cjs/proxact-refresh-runtime.development.js');
}
