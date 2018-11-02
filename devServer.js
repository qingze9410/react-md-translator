/* eslint import/no-extraneous-dependencies: ["off"] */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev');
const PORT = 3000;
const bundler = webpack(webpackConfig);

new WebpackDevServer(bundler, {
    publicPath: '/',
    hot: true,
    historyApiFallback: {
        index: '/demo/'
    },
    stats: {colors: true},
    open: true,
}).listen(PORT, '0.0.0.0', error => {
    if (error) {
        throw error;
    }
});
