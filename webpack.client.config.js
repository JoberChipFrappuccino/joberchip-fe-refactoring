const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
require('dotenv').config()

const devMode = process.env.NODE_ENV !== 'production'
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&log=false&reload=true`

const getEntryPoint = (target) => {
  if (target === 'node') {
    return ['./src/index.tsx']
  }
  return devMode ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx']
}

const getConfig = (target) => {
  return {
    mode: devMode ? 'development' : 'production',
    name: target,
    target,
    devtool: devMode ? 'inline-source-map' : false,
    entry: getEntryPoint(target),
    output: {
      path: path.resolve(__dirname, `dist/${target}`),
      filename: '[name].js',
      publicPath: '/web/',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
      clean: true
    },
    devServer: {
      writeToDisk: true
    },
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          exclude: /\.module\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.module\.s?css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.jsx?$|\.tsx?$/,
          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx']
    },
    plugins:
      target === 'web'
        ? [
            new webpack.HotModuleReplacementPlugin(),
            new LoadablePlugin(),
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) })
          ]
        : [new LoadablePlugin(), new MiniCssExtractPlugin()]
  }
}

module.exports = [getConfig('web'), getConfig('node')]
