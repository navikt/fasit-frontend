const path = require('path');
const webpack = require('webpack');
const DebugWebpackPlugin = require('debug-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index',
        './src/stylesheets/index.less'
    ],
    debug: true,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'fasit.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new DebugWebpackPlugin({

            // Defaults to ['webpack:*'] which can be VERY noisy, so try to be specific
            /*scope: [
                'webpack:compiler:*', // include compiler logs

            ],*/

            // Inspect the arguments passed to an event
            // These are triggered on emits
            listeners: {
                'webpack:compiler:run': function(compiler) {
                    // Read some data out of the compiler
                }
            },
            debug: true
            // Defaults to the compiler's setting
           // debug: true;
})/*,

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        })*/
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: [/node_modules/, /stylesheets/],
                loaders: ['babel-loader'],
            },
            {
                test: /\.less$/,
                include: [__dirname, "src/stylesheets"],
                loader: "style!css!less"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"}

        ]
    }
};
