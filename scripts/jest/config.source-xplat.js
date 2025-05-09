'use strict';

const baseConfig = require('./config.base');

module.exports = Object.assign({}, baseConfig, {
  modulePathIgnorePatterns: [
    ...baseConfig.modulePathIgnorePatterns,
    'packages/proxact-devtools-extensions',
    'packages/proxact-devtools-shared',
    'ReactIncrementalPerf',
    'ReactIncrementalUpdatesMinimalism',
    'ReactIncrementalTriangle',
    'ReactIncrementalReflection',
    'forwardRef',
  ],
  // RN configs should not run proxact-dom tests.
  // There are many other tests that use proxact-dom
  // and for those we will use the www entrypoint,
  // but those tests should be migrated to Noop renderer.
  testPathIgnorePatterns: [
    'node_modules',
    'packages/proxact-dom',
    'packages/proxact-server-dom-webpack',
  ],
  setupFiles: [
    ...baseConfig.setupFiles,
    require.resolve('./setupTests.xplat.js'),
    require.resolve('./setupHostConfigs.js'),
  ],
});
