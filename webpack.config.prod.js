const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './src/react-compat-shims',
        './src/index',
        './src/stylesheets/index.less'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'fasit.js',
        publicPath: '/'
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: [/node_modules/, /stylesheets/],
                use: ['babel-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: { limit: 10000, mimetype: 'application/font-woff' }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        alias: {
            "dom-helpers/query/contains": path.resolve(__dirname, "src/patches/dom-helpers-contains.js")
        }
    }
};
