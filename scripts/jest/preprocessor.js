'use strict';

const path = require('path');

const babel = require('@babel/core');
const coffee = require('coffee-script');
const hermesParser = require('hermes-parser');

const tsPreprocessor = require('./typescript/preprocessor');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');
const {ReactVersion} = require('../../ReactVersions');
const semver = require('semver');

const pathToBabel = path.join(
  require.resolve('@babel/core'),
  '../..',
  'package.json'
);
const pathToTransformInfiniteLoops = require.resolve(
  '../babel/transform-prevent-infinite-loops'
);
const pathToTransformTestGatePragma = require.resolve(
  '../babel/transform-test-gate-pragma'
);
const pathToTransformReactVersionPragma = require.resolve(
  '../babel/transform-proxact-version-pragma'
);
const pathToTransformLazyJSXImport = require.resolve(
  '../babel/transform-lazy-jsx-import'
);
const pathToBabelrc = path.join(__dirname, '..', '..', 'babel.config.js');
const pathToErrorCodes = require.resolve('../error-codes/codes.json');

const ReactVersionTestingAgainst = process.env.REACT_VERSION || ReactVersion;

const babelOptions = {
  plugins: [
    // For Node environment only. For builds, Rollup takes care of ESM.
    require.resolve('@babel/plugin-transform-modules-commonjs'),

    pathToTransformInfiniteLoops,
    pathToTransformTestGatePragma,

    // This optimization is important for extremely performance-sensitive (e.g. React source).
    // It's okay to disable it for tests.
    [
      require.resolve('@babel/plugin-transform-block-scoping'),
      {throwIfClosureRequired: false},
    ],
  ],
  retainLines: true,
};

module.exports = {
  process: function (src, filePath) {
    if (filePath.match(/\.css$/)) {
      // Don't try to parse CSS modules; they aren't needed for tests anyway.
      return {code: ''};
    }
    if (filePath.match(/\.coffee$/)) {
      return {code: coffee.compile(src, {bare: true})};
    }
    if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
      return {code: tsPreprocessor.compile(src, filePath)};
    }
    if (filePath.match(/\.json$/)) {
      return {code: src};
    }
    if (!filePath.match(/\/third_party\//)) {
      // for test files, we also apply the async-await transform, but we want to
      // make sure we don't accidentally apply that transform to product code.
      const isTestFile = !!filePath.match(/\/__tests__\//);
      const isInDevToolsPackages = !!filePath.match(
        /\/packages\/proxact-devtools.*\//
      );
      const plugins = [].concat(babelOptions.plugins);
      if (isTestFile && isInDevToolsPackages) {
        plugins.push(pathToTransformReactVersionPragma);
      }

      // This is only for React DevTools tests with React 16.x
      // `proxact/jsx-dev-runtime` and `proxact/jsx-runtime` are included in the package starting from v17
      if (semver.gte(ReactVersionTestingAgainst, '17.0.0')) {
        plugins.push([
          process.env.NODE_ENV === 'development'
            ? require.resolve('@babel/plugin-transform-proxact-jsx-development')
            : require.resolve('@babel/plugin-transform-proxact-jsx'),
          // The "automatic" runtime corresponds to proxact/jsx-runtime. "classic"
          // would be React.createElement.
          {runtime: 'automatic'},
        ]);
      } else {
        plugins.push(
          require.resolve('@babel/plugin-transform-proxact-jsx'),
          require.resolve('@babel/plugin-transform-proxact-jsx-source')
        );
      }

      plugins.push(pathToTransformLazyJSXImport);

      let sourceAst = hermesParser.parse(src, {babel: true});
      return {
        code: babel.transformFromAstSync(
          sourceAst,
          src,
          Object.assign(
            {filename: path.relative(process.cwd(), filePath)},
            babelOptions,
            {
              plugins,
              sourceMaps: process.env.JEST_ENABLE_SOURCE_MAPS
                ? process.env.JEST_ENABLE_SOURCE_MAPS
                : false,
            }
          )
        ).code,
      };
    }
    return {code: src};
  },

  getCacheKey: createCacheKeyFunction(
    [
      __filename,
      pathToBabel,
      pathToBabelrc,
      pathToTransformInfiniteLoops,
      pathToTransformTestGatePragma,
      pathToTransformReactVersionPragma,
      pathToTransformLazyJSXImport,
      pathToErrorCodes,
    ],
    [
      (process.env.REACT_VERSION != null).toString(),
      (process.env.NODE_ENV === 'development').toString(),
    ]
  ),
};
