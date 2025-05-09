'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-is.production.js');
} else {
  module.exports = require('./cjs/proxact-is.development.js');
}
