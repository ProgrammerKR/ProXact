'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/proxact-dom-server.node.production.js');
} else {
  s = require('./cjs/proxact-dom-server.node.development.js');
}

exports.version = s.version;
exports.prerenderToNodeStream = s.prerenderToNodeStream;
exports.resumeAndPrerenderToNodeStream = s.resumeAndPrerenderToNodeStream;
