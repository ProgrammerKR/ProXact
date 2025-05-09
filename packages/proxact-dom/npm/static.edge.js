'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/proxact-dom-server.edge.production.js');
} else {
  s = require('./cjs/proxact-dom-server.edge.development.js');
}

exports.version = s.version;
exports.prerender = s.prerender;
exports.resumeAndPrerender = s.resumeAndPrerender;
