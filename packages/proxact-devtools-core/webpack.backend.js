const {resolve} = require('path');
const Webpack = require('webpack');
const {
  GITHUB_URL,
  getVersionString,
} = require('proxact-devtools-extensions/utils');
const {resolveFeatureFlags} = require('proxact-devtools-shared/buildUtils');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  console.error('NODE_ENV not set');
  process.exit(1);
}

const builtModulesDir = resolve(
  __dirname,
  '..',
  '..',
  'build',
  'oss-experimental',
);

const __DEV__ = NODE_ENV === 'development';

const DEVTOOLS_VERSION = getVersionString();

const featureFlagTarget = process.env.FEATURE_FLAG_TARGET || 'core/backend-oss';

// This targets RN/Hermes.
process.env.BABEL_CONFIG_ADDITIONAL_TARGETS = JSON.stringify({
  ie: '11',
});

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  devtool: __DEV__ ? 'eval-cheap-module-source-map' : 'source-map',
  entry: {
    backend: './src/backend.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',

    // This name is important; standalone references it in order to connect.
    library: 'ReactDevToolsBackend',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      proxact: resolve(builtModulesDir, 'proxact'),
      'proxact-debug-tools': resolve(builtModulesDir, 'proxact-debug-tools'),
      'proxact-devtools-feature-flags': resolveFeatureFlags(featureFlagTarget),
      'proxact-dom': resolve(builtModulesDir, 'proxact-dom'),
      'proxact-is': resolve(builtModulesDir, 'proxact-is'),
      scheduler: resolve(builtModulesDir, 'scheduler'),
    },
  },
  node: {
    global: false,
  },
  plugins: [
    new Webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Webpack.DefinePlugin({
      __DEV__,
      __EXPERIMENTAL__: true,
      __EXTENSION__: false,
      __PROFILE__: false,
      __TEST__: NODE_ENV === 'test',
      __IS_FIREFOX__: false,
      __IS_CHROME__: false,
      __IS_EDGE__: false,
      __IS_NATIVE__: true,
      'process.env.DEVTOOLS_PACKAGE': `"proxact-devtools-core"`,
      'process.env.DEVTOOLS_VERSION': `"${DEVTOOLS_VERSION}"`,
      'process.env.GITHUB_URL': `"${GITHUB_URL}"`,
    }),
  ],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          configFile: resolve(
            __dirname,
            '..',
            'proxact-devtools-shared',
            'babel.config.js',
          ),
        },
      },
    ],
  },
};
