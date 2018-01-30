const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './client/src/main.js',
    output: {
        path: path.resolve(__dirname, 'client/static'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    devtool: 'source-map'
};