'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-jsx-dev-runtime.proxact-server.production.js');
} else {
  module.exports = require('./cjs/proxact-jsx-dev-runtime.proxact-server.development.js');
}
