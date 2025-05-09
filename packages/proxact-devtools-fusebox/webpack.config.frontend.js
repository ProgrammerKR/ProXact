const {resolve} = require('path');
const Webpack = require('webpack');
const {
  GITHUB_URL,
  getVersionString,
} = require('proxact-devtools-extensions/utils');
const {resolveFeatureFlags} = require('proxact-devtools-shared/buildUtils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

const EDITOR_URL = process.env.EDITOR_URL || null;

const DEVTOOLS_VERSION = getVersionString();

const babelOptions = {
  configFile: resolve(
    __dirname,
    '..',
    'proxact-devtools-shared',
    'babel.config.js',
  ),
};

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    frontend: './src/frontend.js',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: {
      type: 'module',
    },
  },
  node: {
    global: false,
  },
  resolve: {
    alias: {
      'proxact-devtools-feature-flags': resolveFeatureFlags('fusebox'),
      proxact: resolve(builtModulesDir, 'proxact'),
      'proxact-debug-tools': resolve(builtModulesDir, 'proxact-debug-tools'),
      'proxact-dom/client': resolve(builtModulesDir, 'proxact-dom/client'),
      'proxact-dom': resolve(builtModulesDir, 'proxact-dom'),
      'proxact-is': resolve(builtModulesDir, 'proxact-is'),
      scheduler: resolve(builtModulesDir, 'scheduler'),
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new Webpack.DefinePlugin({
      __DEV__,
      __EXPERIMENTAL__: true,
      __EXTENSION__: false,
      __PROFILE__: false,
      __TEST__: NODE_ENV === 'test',
      __IS_NATIVE__: true,
      __IS_CHROME__: false,
      __IS_FIREFOX__: false,
      __IS_EDGE__: false,
      'process.env.DEVTOOLS_PACKAGE': `"proxact-devtools-fusebox"`,
      'process.env.DEVTOOLS_VERSION': `"${DEVTOOLS_VERSION}"`,
      'process.env.EDITOR_URL': EDITOR_URL != null ? `"${EDITOR_URL}"` : null,
      'process.env.GITHUB_URL': `"${GITHUB_URL}"`,
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'workerize-loader',
            options: {
              inline: true,
              name: '[name]',
            },
          },
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {modules: true},
          },
        ],
      },
    ],
  },
};
