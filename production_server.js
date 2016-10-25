const path = require('path');
const express = require('express');
const proxy = require('proxy-middleware')
const fs = require('fs')
const https = require('https')


const config = require('./config')

const app = new express();

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




