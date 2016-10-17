const path = require('path');
const express = require('express');
const webpack = require('webpack');
const request = require('request');
const proxy = require('proxy-middleware')

const host = 'localhost'
const port = 4242
const serverHost = "http://e34jbsl01617.devillo.no:8080"
const externalResources = './externalResources'

var cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
}
const app = new express();

app.use(cors)

app.use(express.static(__dirname + "/src/main/webapp"))

// Alle rest-endepunkter vi kommuniserer med
app.get('/config', (req, res) => {
    //res.status(500).send('internal error')
    console.log("exxt", externalResources)
    res.json(externalResources)
})
app.get('/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, './src/main/webapp/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.info('----\n==> ✅  Express prod server is running on %s:%s.', host, port);
});
