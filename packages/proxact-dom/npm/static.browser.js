'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/proxact-dom-server.browser.production.js');
} else {
  s = require('./cjs/proxact-dom-server.browser.development.js');
}

exports.version = s.version;
exports.prerender = s.prerender;
exports.resumeAndPrerender = s.resumeAndPrerender;
