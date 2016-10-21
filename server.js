const path = require('path');
const express = require('express');
const request = require('request');
const proxy = require('proxy-middleware')

const externalResources = require('./externalResources')
console.log("ext", externalResources)
const host = 'localhost'
const port = 4242

const app = new express();

if (process.env['NODE_ENV'] !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.dev.js');

    const serverOptions = {
        quiet: false,
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: webpackConfig.output.publicPath,
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: {colors: true},
        historyApiFallback: true
    }

    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, serverOptions));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(__dirname + "/dist"))

app.get('/config', (req, res) => {
    res.json(externalResources)
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.info('----\n==> ✅  Webpack Development server is running on %s:%s.', host, port);
});
