const path = require('path');
const express = require('express');
const config = require('./config')
const prometheus = require('prom-client')
prometheus.collectDefaultMetrics()

const app = new express();

app.use(express.static(__dirname + "/dist"))

app.get('/config', (req, res) => {
    res.json(config.externalResources)
})

app.get('/isalive', (req, res) => {
    res.sendStatus(200)
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})


app.listen(config.server.port, function () {
    console.log('running on port %d', config.server.port)
    console.log('config', config.externalResources)
})




