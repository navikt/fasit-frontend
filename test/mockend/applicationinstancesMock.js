module.exports = {
    findApplicationInstance: (queryParams) => {
        return applicationinstances.filter(a => (queryParams.application) ? a.application === queryParams.application : true)
    },

    findApplicationInstanceByApp: (app) => {
        return applicationinstances.filter(a => a.application === app )
    },

    findApplicationInstanceByEnv: (env) => {
        return applicationinstances.filter(a => a.environment === env)
    },

    getInstance: (id) => {
        const instance = applicationinstances.filter(a => (a.id == id ))
        return instance.length === 1 ? instance[0] : applicationinstances[0]
    }
}

const applicationinstances = [
    {
        "application": "app1",
        "environment": "p",
        "version": "1",
        "nodes": [],
        "selftesturls": [
            "https://loadbalanced.com/gosys/internal/selftest",
            "https://airhost1:9444/gosys/internal/selftest",
            "https://airhost2.adeo.no:9444/asys/selftest",
            "https://airhost3.adeo.no:9444/asys/selftest",
            "https://airhost4.adeo.no:9444/asys/selftest",
            "https://airhost5.adeo.no:9444/asys/selftest",
            "https://airhost6.adeo.no:9444/asys/selftest",
            "https://airhost7.adeo.no:9444/asys/selftest",
            "https://airhost8.adeo.no:9444/asys/selftest",
            "https://airhost9.adeo.no:9444/asys/selftest",
            "https://airhost10.adeo.no:9444/asys/selftest",
            "https://airhost11.adeo.no:9444/asys/selftest",
            "https://airhost12.adeo.no:9444/asys/selftest"
        ],
        "cluster": {
            "name": "app1Cluster",
            "ref": "http://localhost:6969/mockapi/environments/p/clusters/app1Cluster"
        },
        "appconfig": {
            "ref": "http://localhost:6969/mockapi/applicationinstances/1/revisions/69/appconfig"
        },
        "exposedresources": [
            {
                "id": 1732091,
                "revison": 1873524,
                "alias": "app1Service",
                "type": "baseurl",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732091"
            }
        ],
        "usedresources": [
            {
                "id": 1732173,
                "revison": 1732174,
                "alias": "loadbalancer:app1",
                "type": "loadbalancerconfig",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p",
                    "application": "app1"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732173"
            },
            {
                "id": 1732170,
                "revison": 1732172,
                "alias": "bigip",
                "type": "loadbalancer",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p",
                    "application": "app1"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732170"
            }
        ],
        "missingresources": [],
        "id": 1,
        "revision": 69,
        "created": "2016-08-09T11:02:30.581",
        "updated": "2016-10-20T11:29:01.54",
        "lifecycle": {},
        "accesscontrol": {},
        "links": {
            "self": "http://localhost:6969/mockapi/applicationinstances/1684520",
            "revisions": "http://localhost:6969/mockapi/applicationinstances/1684520/revisions"
        }
    },
    {
        "application": "app1",
        "environment": "t1",
        "version": "1",
        "selftesturls": [],
        "nodes": [],
        "cluster": {
            "name": "app1Cluster",
            "ref": "http://localhost:6969/mockapi/environments/p/clusters/app1Cluster"
        },
        "appconfig": {
            "ref": "http://localhost:6969/mockapi/applicationinstances/1/appconfig"
        },
        "exposedresources": [
            {
                "id": 1732091,
                "revison": 1873524,
                "alias": "app1Service",
                "type": "baseurl",
                "scope": {
                    "environmentclass": "t",
                    "environment": "t1"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732091"
            }
        ],
        "usedresources": [
            {
                "id": 1732173,
                "revison": 1732174,
                "alias": "loadbalancer:app1",
                "type": "loadbalancerconfig",
                "scope": {
                    "environmentclass": "t",
                    "zone": "fss",
                    "environment": "t1",
                    "application": "app1"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732173"
            },
            {
                "id": 1732170,
                "revison": 1732172,
                "alias": "bigip",
                "type": "loadbalancer",
                "scope": {
                    "environmentclass": "t",
                    "zone": "fss",
                    "environment": "t1",
                    "application": "app1"
                },
                "ref": "http://localhost:6969/mockapi/resources/1732170"
            }
        ],
        "missingresources": [],
        "id": 1684521,
        "created": "2016-08-09T11:02:30.581",
        "updated": "2016-10-20T11:29:01.54",
        "lifecycle": {},
        "accesscontrol": {},
        "links": {
            "self": "http://localhost:6969/mockapi/applicationinstances/1684520",
            "revisions": "http://localhost:6969/mockapi/applicationinstances/1684520/revisions"
        }
    },
    {
        "application": "app1",
        "environment": "u69",
        "version": "2.10.3",
        "nodes": [],
        "selftesturls": [
            "https://ahostname.no:9443/someapp/selftest"
        ],
        "cluster": {
            "name": "app1Cluster",
            "ref": "http://localhost:6969/mockapi/environments/p/clusters/app1Cluster"
        },
        "appconfig": {
            "ref": "http://localhost:6969/mockapi/applicationinstances/1/revisions/69/appconfig"
        },
        "exposedresources": [
            {
                "id": 4,
                "revison": 1873524,
                "alias": "app1Service",
                "type": "webserviceendpoint",
                "scope": {
                    "environmentclass": "u",
                    "environment": "u69"
                },
                "ref": "http://localhost:6969/mockapi/resources/7"
            }
        ],
        "missingresources": [],
        "id": 404,
        "revision": 69,
        "created": "2016-08-09T11:02:30.581",
        "updated": "2016-10-20T11:29:01.54",
        "lifecycle": {},
        "accesscontrol": {},
        "links": {
            "self": "http://localhost:6969/mockapi/applicationinstances/404",
            "revisions": "http://localhost:6969/mockapi/applicationinstances/404/revisions"
        }
    }
]