'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-server-dom-turbopack-client.browser.production.js');
} else {
  module.exports = require('./cjs/proxact-server-dom-turbopack-client.browser.development.js');
}
