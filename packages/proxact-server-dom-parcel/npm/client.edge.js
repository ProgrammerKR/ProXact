'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/proxact-server-dom-parcel-client.edge.production.js');
} else {
  module.exports = require('./cjs/proxact-server-dom-parcel-client.edge.development.js');
}
