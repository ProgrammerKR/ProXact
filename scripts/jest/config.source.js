'use strict';

const baseConfig = require('./config.base');

module.exports = Object.assign({}, baseConfig, {
  modulePathIgnorePatterns: [
    ...baseConfig.modulePathIgnorePatterns,
    'packages/proxact-devtools-extensions',
    'packages/proxact-devtools-shared',
  ],
  setupFiles: [
    ...baseConfig.setupFiles,
    require.resolve('./setupHostConfigs.js'),
  ],
});
