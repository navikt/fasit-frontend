const path = require('path')
const express = require('express')
const request = require('request')
const proxy = require('proxy-middleware')
const fs = require('fs')
const https = require('https')

const environmentsMock = require('./src/test/mockend/environmentsMock')
const resourcesMock = require('./src/test/mockend/resourcesMock')
const applications = require('./src/test/mockend/applicationsMock')
const applicationinstances = require('./src/test/mockend/applicationinstancesMock')
const resourceTypes = require('./src/test/mockend/resourceTypesMock')
const nodesMock = require('./src/test/mockend/nodesMock')
const nodeRevisionsMock = require('./src/test/mockend/nodeRevisionsMock')
const loginMock = require('./src/test/mockend/loginMock')


const config = require('./config')
console.log("ext", config.externalResources)
const selftest = require('./selftest')


const app = new express();

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

app.get("/mockapi/applications/:application", (req, res) => {
    sendJson(res, applications.getApplication(req.params.application))
})
app.put("/mockapi/applications/:application", (req, res) => {
    sendJson(res, applications.putApplication(req.params.application))
})

app.get("/mockapi/applications", (req, res) => {
    sendJson(res, applications.getApplications())
})

app.get("/mockapi/applicationinstances", (req, res) => {
    sendJson(res, applicationinstances.findApplicationInstance(req.query))
})

app.get("/mockapi/applicationinstances/:id", (req, res) => {
    sendJson(res, applicationinstances.getFirst())
})

app.get("/mockapi/applicationinstances/1/revisions/69/appconfig", (req, res) => {
    res.send("<this><is><real><nested><xml>69</xml></nested></real></is></this>")
})

app.get("/mockapi/environments", (req, res) => {
    sendJson(res, environmentsMock.findEnvironments(req.query))
})

app.get("/mockapi/resources/types/", (req, res) => {
    sendJson(res, resourceTypes)
})

app.get("/mockapi/resources", (req, res) => {
    sendJson(res, resourcesMock.findResources(req.query))
})

app.get('/mockapi/resources/:id', (req, res) => {
    sendJson(res, resourcesMock.getResource(req.params.id))
})

app.get("/mockapi/nodes/types", (req, res) => {
    sendJson(res, nodesMock.types)
})


app.get('/mockapi/nodes/:hostname', (req, res) => {
    sendJson(res, nodesMock.getNode(req.params.hostname))
})

app.put('/mockapi/nodes/:hostname', (req, res) => {
    sendJson(res, nodesMock.putNode(req.params.hostname))
})

app.post('/mockapi/nodes/:hostname', (req, res) => {
    sendJson(res, nodesMock.postNode(req.params.hostname))
})

app.delete('/mockapi/nodes/:hostname', (req, res) => {
    sendJson(res, nodesMock.postNode(req.params.hostname))
})

app.get('/mockapi/nodes/:hostname/revisions', (req, res) => {
    sendJson(res, nodeRevisionsMock.getNodeRevisions(req.params.hostname))
})

app.get('/mockapi/nodes/:hostname/revisions/:revision', (req, res) => {
    sendJson(res, nodeRevisionsMock.getNodeRevision(req.params))
})

app.get("/mockapi/nodes", (req, res) => {
    sendJson(res, nodesMock.getNodes())
})

app.get("/mockapi/secrets", (req, res) => {
    res.send("th151s4M0ck53cr3t")
})

if (process.env["NODE_ENV"] === "standalone") {
    app.post("/api/login", (req, res) => {
        sendJson(res, loginMock.getLogin())
    })
    app.post("/api/logout", (req, res) => {
        sendJson(res, loginMock.getLogout())
    })
    app.get("/api/v2/currentuser", (req, res) => {
        sendJson(res, loginMock.getUser())
    })
}
app.get('/selftest', selftest.selftest)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})

function sendJson(res, json) {
    if (!json) {
        res.status(404).send("Found notn for you dawg")
        return
    }
    else if (Array.isArray(json)) {
        res.set('total_count', json.length)
    }
    res.json(json)
}

app.listen(config.server.port, config.server.host, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.info('----\n==> ✅  Webpack Development server is running on %s:%s.', config.server.host, config.server.port);
})


