module.exports = {
    findApplicationInstance: (queryParams) => {
        return applicationinstances.filter(a => (queryParams.application) ? a.application === queryParams.application : true)
    },

    findApplicationInstanceByApp: (app) => {
        return applicationinstances.filter(a => a.application === app)
    },

    findApplicationInstanceByEnv: (env) => {
        return applicationinstances.filter(a => a.environment === env)
    },

    getInstance: (id) => {
        const instance = applicationinstances.filter(a => (a.id == id))
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
                "ref": "http://localhost:6969/mockapi/resources/1732173",
                "lastchange": 1495572976067,
                "lastupdateby": "Jeffafah (j123321)"
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
        "usedresources": [],
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
    },
    {
        "application": "fasit",
        "environment": "p",
        "version": "132",
        "nodes": [],
        "selftesturls": [],
        "cluster": {
            "name": "fasitCluster",
            "ref": "https://fasit.adeo.no/api/v2/environments/p/clusters/fasitCluster"
        },
        "appconfig": {
            "ref": "https://fasit.adeo.no/api/v2/applicationinstances/530662/revisions/3788069/appconfig"
        },
        "exposedresources": [
            {
                "id": 2751528,
                "revision": 2751545,
                "alias": "fasit:search_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/2751528",
                "lastchange": 1498200178894,
                "lastupdateby": "Service User (srvauraautodeploy)"
            },
            {
                "id": 1787017,
                "revision": 1800733,
                "alias": "fasit:nodes_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1787017",
                "lastchange": 1474373344157,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 1786999,
                "revision": 1800729,
                "alias": "fasit:applications_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1786999",
                "lastchange": 1474373342565,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 876383,
                "revision": 1002032,
                "alias": "applicationinstance_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/876383",
                "lastchange": 1444121302685,
                "lastupdateby": "Roger Dybdal (d113507)"
            },
            {
                "id": 1787021,
                "revision": 1800734,
                "alias": "fasit:secrets_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1787021",
                "lastchange": 1474373345002,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 2311413,
                "revision": 2311430,
                "alias": "fasit:navsearch_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/2311413",
                "lastchange": 1489067789295,
                "lastupdateby": "Service User (srvauraautodeploy)"
            },
            {
                "id": 843841,
                "revision": 1002031,
                "alias": "fasit.rest.api",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/843841",
                "lastchange": 1444121302482,
                "lastupdateby": "Roger Dybdal (d113507)"
            },
            {
                "id": 1787019,
                "revision": 1800735,
                "alias": "fasit:environments_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1787019",
                "lastchange": 1474373344660,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 1812322,
                "revision": 1812339,
                "alias": "fasit:resources_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1812322",
                "lastchange": 1475139949062,
                "lastupdateby": "Service User (srvauraautodeploy)"
            },
            {
                "id": 3172071,
                "revision": 3172088,
                "alias": "fasit:lifecycle_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/3172071",
                "lastchange": 1505996488805,
                "lastupdateby": "Service User (srvauraautodeploy)"
            },
            {
                "id": 1787025,
                "revision": 1800730,
                "alias": "fasit:applicationinstances_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1787025",
                "lastchange": 1474373345694,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 2075915,
                "revision": 2075932,
                "alias": "fasit:scopedresource_v2",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/2075915",
                "lastchange": 1481892375763,
                "lastupdateby": "Service User (srvauraautodeploy)"
            }
        ],
        "usedresources": [
            {
                "id": 849880,
                "revision": 904959,
                "alias": "basta.rest.api",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/849880",
                "lastchange": 1439209389469,
                "lastupdateby": "Roger Dybdal (D113507)"
            },
            {
                "id": 647411,
                "revision": 3362129,
                "alias": "envconfDB",
                "type": "datasource",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/647411",
                "lastchange": 1508330528297,
                "lastupdateby": "Roger Bjørnstad (b123034)"
            },
            {
                "id": 1363402,
                "revision": 1363404,
                "alias": "bigip",
                "type": "loadbalancer",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p",
                    "application": "fasit"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1363402",
                "lastchange": 1457962433763,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 1239464,
                "revision": 1334098,
                "alias": "oracle_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1239464",
                "lastchange": 1453289565797,
                "lastupdateby": "Frode Sundby (s138206)"
            },
            {
                "id": 647429,
                "revision": 647430,
                "alias": "fasit.selfservice",
                "type": "rolemapping",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/647429",
                "lastchange": 1413540581531,
                "lastupdateby": "Roger Dybdal (D113507)"
            },
            {
                "id": 647431,
                "revision": 647432,
                "alias": "fasit.prodoperations",
                "type": "rolemapping",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/647431",
                "lastchange": 1413540606299,
                "lastupdateby": "Roger Dybdal (D113507)"
            },
            {
                "id": 1245617,
                "revision": 1690915,
                "alias": "deployLog_v1",
                "type": "restservice",
                "scope": {
                    "environmentclass": "p",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/1245617",
                "lastchange": 1453457800766,
                "lastupdateby": "Service User (srvauraautodeploy)"
            },
            {
                "id": 238560,
                "revision": 3558177,
                "alias": "ldap",
                "type": "ldap",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/238560",
                "lastchange": 1381123240641,
                "lastupdateby": "Roger Dybdal"
            },
            {
                "id": 647419,
                "revision": 702285,
                "alias": "fasit.operations",
                "type": "rolemapping",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "environment": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/647419",
                "lastchange": 1413540539350,
                "lastupdateby": "Roger Dybdal (D113507)"
            },
            {
                "id": 575037,
                "revision": 575039,
                "alias": "srvfasit",
                "type": "credential",
                "scope": {
                    "environmentclass": "p",
                    "zone": "fss",
                    "application": "fasit"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/575037",
                "lastchange": 1411381739450,
                "lastupdateby": "Roger Dybdal (D113507)"
            },
            {
                "id": 927776,
                "revision": 927777,
                "alias": "fasit.superuser",
                "type": "rolemapping",
                "scope": {
                    "environmentclass": "p",
                    "application": "fasit"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/927776",
                "lastchange": 1440485817063,
                "lastupdateby": "Frode Sundby (S138206)"
            },
            {
                "id": 367076,
                "revision": 367078,
                "alias": "fasit.encryptionkeys",
                "type": "credential",
                "scope": {
                    "environmentclass": "p",
                    "application": "fasit"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/367076",
                "lastchange": 1398757573432,
                "lastupdateby": "Frode Sundby"
            },
            {
                "id": 857339,
                "revision": 857340,
                "alias": "fasit.selfservice_prod",
                "type": "rolemapping",
                "scope": {
                    "environmentclass": "p"
                },
                "ref": "https://fasit.adeo.no/api/v2/resources/857339",
                "lastchange": 1429855522085,
                "lastupdateby": "Roger Dybdal (D113507)"
            }
        ],
        "missingresources": [],
        "environmentclass": "p",
        "id": 530662,
        "revision": 3788069,
        "created": "2014-09-02T07:51:44.682",
        "updated": "2015-02-10T14:26:06.158",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "p"
        },
        "links": {
            "self": "https://fasit.adeo.no/api/v2/applicationinstances/530662",
            "revisions": "https://fasit.adeo.no/api/v2/applicationinstances/530662/revisions"
        }
    }
]