'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-art.production.js');
} else {
  module.exports = require('./cjs/proxact-art.development.js');
}
