'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact.production.js');
} else {
  module.exports = require('./cjs/proxact.development.js');
}
