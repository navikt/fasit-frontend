module.exports = {
    findNodeRevisions: (queryParams) => {
        return nodeRevisions.filter(a => (queryParams.application) ? a.application === queryParams.application : true)
    }
}

const nodeRevisions = [
    {
        "revision": 1584993,
        "timestamp": "2016-06-20T10:01:07.772",
        "author": "Service User",
        "onbehalfof": {
            "id": "srvorchestrator",
            "exists": false
        },
        "authorid": "srvbasta",
        "message": "Bestilt i Basta av b123034",
        "revisiontype": "add",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/1584993"
        }
    },
    {
        "revision": 1710733,
        "timestamp": "2016-08-22T08:32:54.308",
        "author": "unauthenticated",
        "authorid": "unauthenticated",
        "message": "Automatic cleanup: Alerting element as candidate for deletion. See jira issue for info AURAGC-5878",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/1710733"
        }
    },
    {
        "revision": 1765941,
        "timestamp": "2016-09-13T13:58:55.644",
        "author": "Roger Bjørnstad",
        "authorid": "b123034",
        "message": "Rescued from deletion with comment: null",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/1765941"
        }
    },
    {
        "revision": 2140493,
        "timestamp": "2017-01-31T10:06:49.036",
        "author": "Frode Sundby",
        "authorid": "s138206",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
        }
    },
    {
        "revision": 2140495,
        "timestamp": "2017-01-31T10:10:45.497",
        "author": "Frode Sundby",
        "authorid": "s138206",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
        }
    },
    {
        "revision": 2140497,
        "timestamp": "2017-01-31T10:25:54.432",
        "author": "Frode Sundby",
        "authorid": "s138206",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
        }
    },
    {
        "revision": 2140499,
        "timestamp": "2017-01-31T10:27:57.557",
        "author": "Frode Sundby",
        "authorid": "s138206",
        "revisiontype": "mod",
        "links": {
            "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
        }
    }
]

nodeRevision1 = {
    "hostname": "d26jbsl00915.test.local",
    "environmentclass": "t",
    "environment": "t1",
    "type": "jboss",
    "username": "deployer",
    "password": {
        "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
    },
    "cluster": {
        "name": "pensjon-patchstatusCluster",
        "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/t1/clusters/pensjon-patchstatusCluster"
    },
    "applications": [
        "pensjon-patchstatus"
    ],
    "id": 1584991,
    "revision": 1584993,
    "lifecycle": {},
    "accesscontrol": {
        "environmentclass": "t",
        "adgroups": []
    },
    "links": {
        "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
        "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
    }
}

nodeRevision2 = {
    "hostname": "d26jbsl00915.test.local",
    "environmentclass": "t",
    "environment": "t1",
    "type": "jboss",
    "username": "deployer",
    "password": {
    "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
},
    "cluster": {
    "name": "pensjon-patchstatusCluster",
        "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/t1/clusters/pensjon-patchstatusCluster"
},
    "applications": [
    "pensjon-patchstatus"
],
    "id": 1584991,
    "revision": 1710733,
    "lifecycle": {
    "status": "alerted",
        "nextactiondate": "2016-11-20T08:32:53.559",
        "issue": "AURAGC-5878"
},
    "accesscontrol": {
    "environmentclass": "t",
        "adgroups": []
},
    "links": {
    "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
        "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
}
}