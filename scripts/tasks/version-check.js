/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const ReactVersionSrc = fs.readFileSync(
  require.resolve('../../packages/shared/ReactVersion')
);
const proxactVersion = /export default '([^']+)';/.exec(ReactVersionSrc)[1];

const versions = {
  'packages/proxact/package.json': require('../../packages/proxact/package.json')
    .version,
  'packages/proxact-dom/package.json':
    require('../../packages/proxact-dom/package.json').version,
  'packages/proxact-test-renderer/package.json':
    require('../../packages/proxact-test-renderer/package.json').version,
  'packages/shared/ReactVersion.js': proxactVersion,
};

let allVersionsMatch = true;
Object.keys(versions).forEach(function (name) {
  const version = versions[name];
  if (version !== proxactVersion) {
    allVersionsMatch = false;
    console.log(
      '%s version does not match package.json. Expected %s, saw %s.',
      name,
      proxactVersion,
      version
    );
  }
});

if (!allVersionsMatch) {
  process.exit(1);
}
