'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-jsx-runtime.production.js');
} else {
  module.exports = require('./cjs/proxact-jsx-runtime.development.js');
}
