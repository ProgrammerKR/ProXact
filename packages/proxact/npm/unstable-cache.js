'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-unstable-cache.production.js');
} else {
  module.exports = require('./cjs/proxact-unstable-cache.development.js');
}
