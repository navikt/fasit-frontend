const path = require('path');
const express = require('express');
//const proxy = require('proxy-middleware')
//const fs = require('fs')
//const http = require('http')


const config = require('./config')
const selftest = require('./selftest')

const app = new express();

app.use(express.static(__dirname + "/dist"))

app.get('/config', (req, res) => {
    res.json(config.externalResources)
})

app.get('/isalive', (req, res) => {
    res.sendStatus(200)
})

app.get('/selftest', selftest.selftest)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})
// const httpServer = http.createServer({
//     key: fs.readFileSync(config.server.tlsPrivateKey),
//     cert: fs.readFileSync(config.server.tlsCert)
// }, app);

app.listen(config.server.port, function () {
    console.log('running on port %d', config.server.port)
    console.log('config', config.externalResources)
})




