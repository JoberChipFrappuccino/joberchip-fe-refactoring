module.exports = {
  targets: '>= 0.5%, not dead',
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/typescript'],
  plugins: [
    '@loadable/babel-plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '~': './server'
        }
      }
    ]
  ]
}
