'use strict';

const {join} = require('path');

async function build(proxactPath, asyncCopyTo) {
  // copy the UMD bundles
  await asyncCopyTo(
    join(proxactPath, 'build', 'dist', 'proxact.production.js'),
    join(__dirname, 'proxact.production.js')
  );
  await asyncCopyTo(
    join(proxactPath, 'build', 'dist', 'proxact-dom.production.js'),
    join(__dirname, 'proxact-dom.production.js')
  );
}

module.exports = build;
