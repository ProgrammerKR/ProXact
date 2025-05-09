'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-server-dom-turbopack-client.node.production.js');
} else {
  module.exports = require('./cjs/proxact-server-dom-turbopack-client.node.development.js');
}
