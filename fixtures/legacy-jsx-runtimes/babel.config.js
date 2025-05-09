module.exports = {
  presets: [
    [
      '@babel/proxact',
      {
        runtime: 'automatic',
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};
