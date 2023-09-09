module.exports = {
  targets: '>= 0.5%, not dead',
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/typescript',
  ],
  plugins: [
    '@loadable/babel-plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '~': './server',
        },
      },
    ],
  ],
}

/**
 * 참고 자료
 * 1. 불필요한 React import를 제거
 * https://velog.io/@sooyun9600/React-is-not-defined-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0
 */
