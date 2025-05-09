'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-cache.production.js');
} else {
  module.exports = require('./cjs/proxact-cache.development.js');
}
