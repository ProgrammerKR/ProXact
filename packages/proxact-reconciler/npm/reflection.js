'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-reconciler-reflection.production.js');
} else {
  module.exports = require('./cjs/proxact-reconciler-reflection.development.js');
}
