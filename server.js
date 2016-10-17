const path = require('path');
const express = require('express');
const webpack = require('webpack');
const request = require('request');
const proxy = require('proxy-middleware')

const webpackConfig = require('./webpack.config.dev.js');
const compiler = webpack(webpackConfig);

const host = 'localhost'
const port = 4242
const serverHost = "http://e34jbsl01655.devillo.no:8080"

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

var cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + "/src/main/webapp"))

app.get('/config', (req, res) => {
    //res.status(500).send('internal error')
    res.json({apiHost:"http://e34jbsl01617.devillo.no:8080"})
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './src/main/webapp/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.info('----\n==> ✅  Webpack Development server is running on %s:%s.', host, port);
});
