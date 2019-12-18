module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  ignore: ['node_modules'],
  env: {
    test: {
      plugins: ['istanbul'],
    },
  },
}
