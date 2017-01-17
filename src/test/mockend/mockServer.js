const express = require('express')
const environments = require('./environmentsMock')
const resources = require('./resourcesMock')
const resourceTypes = require('./resourceTypesMock')
const app = express()
const cors  = require('cors')
const corsConfig = {
    "exposedHeaders": "total_count, Link"
}
app.use(cors(corsConfig))


app.get("/environments", (req, res) => {
    res.set('total_count', environments.length)
    res.json(environments)
})

app.get("/resources/types/", (req, res) => {
    res.set('total_count', resourceTypes.length )
    res.json(resourceTypes)
})

app.get("/resources", (req, res) => {
    res.set('total_count', resources.length)
    res.json(resources)
})

app.listen(process.env.PORT)

