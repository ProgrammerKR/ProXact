'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-markup.production.js');
} else {
  module.exports = require('./cjs/proxact-markup.development.js');
}
