module.exports = {
    getNodeRevisions: (hostname) => nodeRevisions.filter(host => (host.hostname === hostname) ? true : false)[0].values,
    getNodeRevision: (params) => revisions.filter(rev => (rev.revision == params.revision && rev.hostname === params.hostname))[0]
}

const nodeRevisions = [
    {
        hostname: "host1.test.local",
        values: [
            {
                "revision": 1,
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
                "revision": 2,
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
                "revision": 3,
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
                "revision": 4,
                "timestamp": "2017-01-31T10:06:49.036",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
                }
            },
            {
                "revision": 5,
                "timestamp": "2017-01-31T10:10:45.497",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
                }
            },
            {
                "revision": 6,
                "timestamp": "2017-01-31T10:25:54.432",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
                }
            },
            {
                "revision": 7,
                "timestamp": "2017-01-31T10:27:57.557",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
                }
            }
        ]

    },
    {
        hostname: "host2.preprod.local",
        values: [
            {
                "revision": 8,
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
                "revision": 9,
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
                "revision": 10,
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
                "revision": 11,
                "timestamp": "2017-01-31T10:06:49.036",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
                }
            },
            {
                "revision": 12,
                "timestamp": "2017-01-31T10:10:45.497",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
                }
            },
            {
                "revision": 13,
                "timestamp": "2017-01-31T10:25:54.432",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
                }
            },
            {
                "revision": 14,
                "timestamp": "2017-01-31T10:27:57.557",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
                }
            }
        ]

    },

    {
        hostname: "host3.devillo.no",
        values: [
            {
                "revision": 15,
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
                "revision": 16,
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
                "revision": 17,
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
                "revision": 18,
                "timestamp": "2017-01-31T10:06:49.036",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
                }
            },
            {
                "revision": 19,
                "timestamp": "2017-01-31T10:10:45.497",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
                }
            },
            {
                "revision": 20,
                "timestamp": "2017-01-31T10:25:54.432",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
                }
            },
            {
                "revision": 21,
                "timestamp": "2017-01-31T10:27:57.557",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
                }
            }
        ]

    },
    {
        hostname: "host4.test.local",
        values: [
            {
                "revision": 22,
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
                "revision": 23,
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
                "revision": 24,
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
                "revision": 25,
                "timestamp": "2017-01-31T10:06:49.036",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
                }
            },
            {
                "revision": 26,
                "timestamp": "2017-01-31T10:10:45.497",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
                }
            },
            {
                "revision": 27,
                "timestamp": "2017-01-31T10:25:54.432",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
                }
            },
            {
                "revision": 28,
                "timestamp": "2017-01-31T10:27:57.557",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
                }
            }
        ]

    },
    {
        hostname: "prodserver.nav.no",
        values: [
            {
                "revision": 29,
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
                "revision": 30,
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
                "revision": 31,
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
                "revision": 32,
                "timestamp": "2017-01-31T10:06:49.036",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140493"
                }
            },
            {
                "revision": 33,
                "timestamp": "2017-01-31T10:10:45.497",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140495"
                }
            },
            {
                "revision": 34,
                "timestamp": "2017-01-31T10:25:54.432",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140497"
                }
            },
            {
                "revision": 35,
                "timestamp": "2017-01-31T10:27:57.557",
                "author": "Frode Sundby",
                "authorid": "s138206",
                "revisiontype": "mod",
                "links": {
                    "entity": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions/2140499"
                }
            }
        ]

    }

]

revisions = [
 {
    "hostname": "host1.test.local",
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
    "revision": 1,
    "lifecycle": {},
    "accesscontrol": {
        "environmentclass": "t",
        "adgroups": []
    },
    "links": {
        "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
        "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
    }
},
    {
        "hostname": "host1.test.local",
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
        "revision": 2,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host1.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "revb3",
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
        "revision": 3,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host1.test.local",
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
        "revision": 4,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host1.test.local",
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
        "revision": 5,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host1.test.local",
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
        "revision": 6,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host1.test.local",
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
        "revision": 7,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },

    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 1,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 2,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 3,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 4,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 5,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 6,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "prodserver.nav.no",
        "environmentclass": "t",
        "environment": "p",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 7,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },

    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 1,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 2,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 3,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 4,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 5,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 6,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host2.preprod.local",
        "environmentclass": "q",
        "environment": "q1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 7,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },

    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 1,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 2,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 3,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 4,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 5,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 6,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host3.devillo.no",
        "environmentclass": "t",
        "environment": "u689",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 7,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },

    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 1,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 2,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 3,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 4,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 5,
        "lifecycle": {
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 6,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "self": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local",
            "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/d26jbsl00915.test.local/revisions"
        }
    },
    {
        "hostname": "host4.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/secrets/1584992"
        },
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://e34jbsl01655.devillo.no:8443/api/v2/environments/q1/clusters/pensjon-patchstatusCluster"
        },
        "applications": [
            "pensjon-patchstatus"
        ],
        "id": 1584991,
        "revision": 7,
        "lifecycle": {
            "status": "alerted"
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




]