'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-server-dom-webpack-client.edge.production.js');
} else {
  module.exports = require('./cjs/proxact-server-dom-webpack-client.edge.development.js');
}
