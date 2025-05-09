module.exports = {
  baseUrl: '.',
  name: 'input',
  out: 'output.js',
  optimize: 'none',
  paths: {
    proxact: '../../../../build/oss-experimental/proxact/umd/proxact.production.min',
    'proxact-dom':
      '../../../../build/oss-experimental/proxact-dom/umd/proxact-dom.production.min',
    schedule:
      '../../../../build/oss-experimental/scheduler/umd/schedule.development',
  },
};
