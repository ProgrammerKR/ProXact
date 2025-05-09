'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-reconciler-constants.production.js');
} else {
  module.exports = require('./cjs/proxact-reconciler-constants.development.js');
}
