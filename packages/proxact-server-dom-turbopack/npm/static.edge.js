'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/proxact-server-dom-turbopack-server.edge.production.js');
} else {
  s = require('./cjs/proxact-server-dom-turbopack-server.edge.development.js');
}

if (s.unstable_prerender) {
  exports.unstable_prerender = s.unstable_prerender;
}
