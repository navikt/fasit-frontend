const packageJson = require('./package.json')
const moment = require('moment');
const fetch = require('isomorphic-fetch')
const config = require('./config')

exports.selftest = function (req, res, next) {
    console.log(config.externalResources)

    let selftestResult = {
        "application": "fasit-frontend",
        "version": packageJson.version,
        "timestamp": moment(),
        "aggregate_result": 0,
        "checks": []
    }

    const totalResources = Object.keys(config.externalResources).length

    for (let resource in config.externalResources) {
        const startTime = Date.now();
        fetch(config.externalResources[resource])
            .then(response => {
                console.log("fetching", config.externalResources[resource] )
                let endTime = Date.now();
                let checkResult = {
                    "endpoint": config.externalResources[resource],
                    "description": `Check ${resource}`,
                    "result": 0,
                    "responseTime": endTime - startTime + " ms"
                }
                if (response.status != 200) {
                    checkResult.result = 1
                    checkResult.errorMessage = `${response.status}:${response.statusText}`
                    selftestResult.aggregate_result = 1
                }
                selftestResult.checks.push(checkResult)
                if (selftestResult.checks.length === totalResources) {
                    res.header("Content-Type", "application/json; charset=utf-8");
                    res.json(selftestResult);
                }

            })

            .catch(err => {
                console.log("fetching failed:", config.externalResources[resource], "errormessage", err )
                let endTime = Date.now();
                let checkResult = {
                    "endpoint": config.externalResources[resource],
                    "description": `Check ${resource}`,
                    "result": 1,
                    "responseTime": endTime - startTime + " ms"
                }
                checkResult.responseTime = endTime - startTime + " ms"
                checkResult.checkResult = 1
                checkResult.errorMessage = err
                selftestResult.aggregate_result = 1
                selftestResult.checks.push(checkResult)
                if (selftestResult.checks.length === totalResources) {
                    res.header("Content-Type", "application/json; charset=utf-8");
                    res.json(selftestResult);
                }
            })

    }

/*    fetch('http://e34jbsl01655.devillo.no:8080/api/v2/resources')
        .then(res => {
                let endTime = Date.now();
                let checkResult = {
                    "endpoint": 'http://e34jbsl01655.devillo.no:8080/api/v2/resources',
                    "description": "Check fasit resources",
                    "checkResult": 0,
                    "responseTime": (endTime - startTime) + " ms"
                }
                if (res.status != 200) {
                    checkResult.result = 1;
                    checkResult.errorMessage = `${res.status}:${res.statusText}`
                }
                selftestResult.checks.push(checkResult)
            }
        )*/

}
