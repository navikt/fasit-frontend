const path = require('path');
const express = require('express');
const request = require('request');
const proxy = require('proxy-middleware')

const externalResources = require('./externalResources')

const host = 'localhost'
const port = 4242
const serverHost = "http://e34jbsl01655.devillo.no:8080"


const cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "devillo.no");
    return next();
}

const app = new express();

app.use(cors)

app.use('/api/login', function(req, res) {
    var url = `${serverHost}/api/login`;
    console.log(url)
    req.pipe(request(url)).pipe(res);
});

app.use('/api/logout', function(req, res) {
    var url = `${serverHost}/api/logout`;
    console.log(url)
    req.pipe(request(url)).pipe(res);
});

app.use('/api/v2', function(req, res) {
    var url = `${serverHost}/api/v2${req.url}`;
    req.pipe(request(url)).pipe(res);
});

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
