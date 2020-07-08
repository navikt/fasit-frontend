const path = require("path")
const express = require("express")

const environmentsMock = require("./test/mockend/environmentsMock")
const resourcesMock = require("./test/mockend/resourcesMock")
const resourceRevisionMock = require("./test/mockend/resourceRevisionsMock")
const applicationsMock = require("./test/mockend/applicationsMock")
const applicationinstances = require("./test/mockend/applicationinstancesMock")
const applicationinstancesRevisionsMock = require("./test/mockend/applicationInstancesRevisionsMock")
const resourceTypes = require("./test/mockend/resourceTypesMock")
const nodesMock = require("./test/mockend/nodesMock")
const navSearchMock = require("./test/mockend/navSearchMock")
const searchMock = require("./test/mockend/searchMock")
const nodeRevisionsMock = require("./test/mockend/nodeRevisionsMock")
const loginMock = require("./test/mockend/loginMock")

const config = require("./config")
console.log("ext", config.externalResources)

const app = new express()
app.use(express.static(__dirname + "/dist"))

/* Useful for making mock function sleep when simulating slow apis
 * sleep(5000).then(() => {sendJson(res, resourcesMock.getResource(req.params.id))})*/
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

app.get("/config", (req, res) => {
  res.json(config.externalResources)
})

app.put("/mockapi/v1/lifecycle/:entityTyp/:id", (req, res) => {
  console.info("lifecycle", req.params)
  res.sendStatus(201)
})

app.get("/mockapi/v2/applications/:application", (req, res) => {
  sendJson(res, applicationsMock.getApplication(req.params.application))
})

app.get("/mockapi/v2/applications/:application/revisions", (req, res) => {
  sendJson(res, applicationsMock.getApplicatonRevisons())
})

app.put("/mockapi/v2/applications/:application", (req, res) => {
  sendJson(res, applicationsMock.putApplication(req.params.application))
})

app.delete("/mockapi/v2/applications/:application", (req, res) => {
  applicationsMock.deleteApplication(req.params.application)
  res.sendStatus(200)
})

app.get("/mockapi/v1/navsearch", (req, res) => {
  sendJson(res, navSearchMock.getNavSearch())
})

app.get("/mockapi/v1/search", (req, res) => {
  sendJson(res, searchMock.getSearch(req.query))
})

app.get("/mockapi/v2/applications", (req, res) => {
  sendJson(res, applicationsMock.getApplications())
})

app.get("/mockapi/v2/applicationinstances", (req, res) => {
  sendJson(res, applicationinstances.findApplicationInstance(req.query))
})

app.get("/mockapi/v2/applicationinstances/:id", (req, res) => {
  sendJson(res, applicationinstances.getInstance(req.params.id))
})

app.get("/mockapi/v2/applicationinstances/:id/revisions", (req, res) => {
  sendJson(
    res,
    applicationinstancesRevisionsMock.getApplicationInstanceRevisions()
  )
})

app.get(
  "/mockapi/v2/applicationinstances/environment/:environment",
  (req, res) => {
    sendJson(
      res,
      applicationinstances.findApplicationInstanceByEnv(req.params.environment)
    )
  }
)

app.get(
  "/mockapi/v2/applicationinstances/application/:application",
  (req, res) => {
    sendJson(
      res,
      applicationinstances.findApplicationInstanceByApp(req.params.application)
    )
  }
)

app.get(
  "/mockapi/v2/applicationinstances/1/revisions/69/appconfig",
  (req, res) => {
    res.send(
      "<this><is><real><nested><xml>69</xml></nested></real></is></this>"
    )
  }
)

app.get("/mockapi/v2/environments/:name/clusters/:clustername", (req, res) => {
  sendJson(
    res,
    environmentsMock.getCluster(req.params.name, req.params.clustername)
  )
})

app.get(
  "/mockapi/v2/environments/:name/clusters/:clustername/revisions",
  (req, res) => {
    sendJson(res, environmentsMock.getClusterRevisions())
  }
)

app.get(
  "/mockapi/v2/environments/:name/clusters/:clustername/revisions/:revision",
  (req, res) => {
    sendJson(res, environmentsMock.getClusterRevision())
  }
)

app.get("/mockapi/v2/environments/:name/clusters/", (req, res) => {
  sendJson(res, environmentsMock.getClusters(req.params.name))
})

app.get("/mockapi/clusters/:id/", (req, res) => {
  sendJson(res, environmentsMock.getCluster("u1", "bpm"))
})

app.get("/mockapi/v2/clusters/:id/revisions", (req, res) => {
  sendJson(res, environmentsMock.getClusterRevisions())
})

app.get("/mockapi/v2/clusters/:id/revisions/:revision", (req, res) => {
  sendJson(res, environmentsMock.getClusterRevision())
})

app.get("/mockapi/v2/environments/:name", (req, res) => {
  sendJson(res, environmentsMock.getEnvironment(req.params.name))
})

app.delete("/mockapi/v2/environments/:name", (req, res) => {
  sendJson(res, environmentsMock.deleteEnvironment(req.params.name))
})

app.get("/mockapi/v2/environments", (req, res) => {
  sendJson(res, environmentsMock.findEnvironments(req.query))
})

app.post("/mockapi/v2/environments", (req, res) => {
  res.sendStatus(201)
})

app.get("/mockapi/v2/resources/types/", (req, res) => {
  sendJson(res, resourceTypes)
})

app.get("/mockapi/v2/resources", (req, res) => {
  sendJson(res, resourcesMock.findResources(req.query))
})

app.get("/mockapi/v2/resources/:id", (req, res) => {
  sendJson(res, resourcesMock.getResource(req.params.id))
})

app.get("/mockapi/v2/resources/:id/revisions", (req, res) => {
  sendJson(res, resourceRevisionMock.getResourceRevisions(req.params.id))
})

app.get("/mockapi/v2/resources/:id/revisions/:revision", (req, res) => {
  sendJson(res, resourceRevisionMock.getResourceRevision(req.params))
})

app.delete("/mockapi/v2/resources/:id", (req, res) => {
  resourcesMock.deleteresource(req.params.id)
  res.sendStatus(200)
})

app.post("/mockapi/v2/resources", (req, res) => {
  res.sendStatus(200)
})

app.put("/mockapi/v2/resources/:id", (req, res) => {
  res.sendStatus(201)
})

app.get("/mockapi/v2/nodes/types", (req, res) => {
  sendJson(res, nodesMock.types)
})

app.get("/mockapi/v2/nodes/:hostname", (req, res) => {
  sendJson(res, nodesMock.getNode(req.params.hostname))
})

app.put("/mockapi/v2/nodes/:hostname", (req, res) => {
  sendJson(res, nodesMock.putNode(req.params.hostname))
})

app.post("/mockapi/v2/nodes/:hostname", (req, res) => {
  sendJson(res, nodesMock.postNode(req.params.hostname))
})

app.delete("/mockapi/v2/nodes/:hostname", (req, res) => {
  nodesMock.deleteNode(req.params.hostname)
  res.sendStatus(200)
})

app.get("/mockapi/v2/nodes/:hostname/revisions", (req, res) => {
  sendJson(res, nodeRevisionsMock.getNodeRevisions(req.params.hostname))
})

app.get("/mockapi/v2/nodes/:hostname/revisions/:revision", (req, res) => {
  sendJson(res, nodeRevisionsMock.getNodeRevision(req.params))
})

app.get("/mockapi/v2/nodes", (req, res) => {
  sendJson(res, nodesMock.getNodes())
})

app.get("/mockapi/v2/secrets/*", (req, res) => {
  res.send("th151s4M0ck53cr3t")
})

if (process.env["NODE_ENV"] === "standalone") {
  app.post("/mockapi/login", (req, res) => {
    sendJson(res, loginMock.getLogin())
  })
  app.post("/mockapi/logout", (req, res) => {
    sendJson(res, loginMock.getLogout())
  })
  app.get("/mockapi/v2/currentuser", (req, res) => {
    sendJson(res, loginMock.getUser())
  })
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"))
})

function sendJson(res, json) {
  if (!json) {
    res.status(404).send("Found notn for you dawg")
    return
  } else if (Array.isArray(json)) {
    res.set("total_count", json.length)
  }
  res.json(json)
}

app.listen(config.server.port, config.server.host, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.info(
    "----\n==> ✅  Development server is running on %s:%s.",
    config.server.host,
    config.server.port
  )
})
