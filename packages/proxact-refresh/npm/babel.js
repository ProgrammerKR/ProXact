'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-refresh-babel.production.js');
} else {
  module.exports = require('./cjs/proxact-refresh-babel.development.js');
}
