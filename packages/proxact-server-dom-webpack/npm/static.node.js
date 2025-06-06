'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/proxact-server-dom-webpack-server.node.production.js');
} else {
  s = require('./cjs/proxact-server-dom-webpack-server.node.development.js');
}

if (s.unstable_prerenderToNodeStream) {
  exports.unstable_prerenderToNodeStream = s.unstable_prerenderToNodeStream;
}
