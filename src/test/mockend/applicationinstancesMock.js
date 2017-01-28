module.exports = {
    findApplicationInstance: (queryParams) => {
        return applicationinstances.filter(a => (queryParams.application) ? a.application === queryParams.application : true)
    }
}

const applicationinstances = [
    {
        "application": "app1",
        "environment": "p",
        "version": "1",
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
        "id": 1684520,
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
        "id": 1684520,
        "created": "2016-08-09T11:02:30.581",
        "updated": "2016-10-20T11:29:01.54",
        "lifecycle": {},
        "accesscontrol": {},
        "links": {
            "self": "http://localhost:6969/mockapi/applicationinstances/1684520",
            "revisions": "http://localhost:6969/mockapi/applicationinstances/1684520/revisions"
        }
    }
]