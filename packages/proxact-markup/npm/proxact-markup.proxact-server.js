'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-markup.proxact-server.production.js');
} else {
  module.exports = require('./cjs/proxact-markup.proxact-server.development.js');
}
