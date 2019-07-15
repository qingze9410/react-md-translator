/* eslint-disable no-console */
const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: Object.assign({},
      {
        site: [
          'webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          './demo/index'
        ],
      }),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'demo/index.html'),
      chunks: ['site']
    })],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'scss-loader'
        }]
      },

      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      }
    ]
  }
};
