const path = require('path');
const express = require('express');
const request = require('request');
const proxy = require('proxy-middleware')
const fs = require('fs')
const https = require('https')


const config = require('./config')
console.log("ext", config.externalResources)

const app = new express();

if (process.env['NODE_ENV'] === 'production') {

    app.use(express.static(__dirname + "/dist"))

    app.get('/config', (req, res) => {
        res.json(config.externalResources)
    })
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './dist/index.html'));
    })
    const httpsServer = https.createServer({
        key: fs.readFileSync(config.server.tlsPrivateKey),
        cert: fs.readFileSync(config.server.tlsCert)
    }, app);

    httpsServer.listen(config.server.port, function () {
        console.log('running on port %d', config.server.port)
    })

} else {

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
    app.use(express.static(__dirname + "/dist"))

    app.get('/config', (req, res) => {
        res.json(config.externalResources)
    })

    //app.get('/selftest', selftestService)

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './dist/index.html'));
    })

    app.listen(config.server.port, config.server.host, (err) => {
        if (err) {
            console.error(err);
            return
        }
        console.info('----\n==> ✅  Webpack Development server is running on %s:%s.', config.server.host, config.server.port);
    })
}

