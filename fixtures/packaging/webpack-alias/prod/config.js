var path = require('path');

module.exports = {
  entry: './input',
  output: {
    filename: 'output.js',
  },
  resolve: {
    root: path.resolve('../../../../build/oss-experimental'),
    alias: {
      proxact: 'proxact/umd/proxact.production.min',
      'proxact-dom': 'proxact-dom/umd/proxact-dom.production.min',
    },
  },
};
