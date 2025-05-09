'use strict';

var l, s;
if (process.env.NODE_ENV === 'production') {
  l = require('./cjs/proxact-dom-server-legacy.node.production.js');
  s = require('./cjs/proxact-dom-server.node.production.js');
} else {
  l = require('./cjs/proxact-dom-server-legacy.node.development.js');
  s = require('./cjs/proxact-dom-server.node.development.js');
}

exports.version = l.version;
exports.renderToString = l.renderToString;
exports.renderToStaticMarkup = l.renderToStaticMarkup;
exports.renderToPipeableStream = s.renderToPipeableStream;
if (s.resumeToPipeableStream) {
  exports.resumeToPipeableStream = s.resumeToPipeableStream;
}
