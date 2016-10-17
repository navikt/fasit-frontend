const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        '../src/js/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'fasit.js',
        publicPath: '../src/main/webapp/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /styles/],
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../src')
            }
        ]
    }
};
