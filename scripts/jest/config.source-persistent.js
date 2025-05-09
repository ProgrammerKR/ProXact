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
  setupFiles: [
    ...baseConfig.setupFiles,
    require.resolve('./setupTests.persistent.js'),
    require.resolve('./setupHostConfigs.js'),
  ],
});
