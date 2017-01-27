module.exports = {
    findEnvironments: function (queryParams) {
        return environments.filter(e => (queryParams.environmentclass) ? e.environmentclass === queryParams.environmentclass : true)
    }
}

const environments = [
    {
        "name": "u1",
        "environmentclass": "u",
        "id": 1,
        "created": "2014-03-11T13:19:49.082",
        "updated": "2014-03-11T13:19:49.082",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=u15",
            "self": "https://fasit.adeo.no/api/v2/environments/u15",
            "revisions": "https://fasit.adeo.no/api/v2/environments/u15/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/u15/clusters"
        }
    },
    {
        "name": "u69",
        "environmentclass": "u",
        "id": 2,
        "created": "2014-04-04T10:48:57.179",
        "updated": "2014-04-04T10:48:57.179",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=u99",
            "self": "https://fasit.adeo.no/api/v2/environments/u99",
            "revisions": "https://fasit.adeo.no/api/v2/environments/u99/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/u99/clusters"
        }
    },
    {
        "name": "q1",
        "environmentclass": "q",
        "id": 3,
        "created": "2013-10-22T11:28:05.678",
        "updated": "2013-10-22T11:28:05.678",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=q6",
            "self": "https://fasit.adeo.no/api/v2/environments/q6",
            "revisions": "https://fasit.adeo.no/api/v2/environments/q6/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/q6/clusters"
        }
    },
    {
        "name": "q2",
        "environmentclass": "q",
        "id": 1438021,
        "created": "2016-04-15T13:04:09.251",
        "updated": "2016-06-15T08:59:39.716",
        "lifecycle": {
            "status": "rescued",
            "nextactiondate": "2017-06-15T08:59:39.711",
            "issue": "AURAGC-5335"
        },
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=d4",
            "self": "https://fasit.adeo.no/api/v2/environments/d4",
            "revisions": "https://fasit.adeo.no/api/v2/environments/d4/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/d4/clusters"
        }
    },
    {
        "name": "t1",
        "environmentclass": "t",
        "id": 23,
        "created": "2016-04-15T13:04:09.251",
        "updated": "2016-06-15T08:59:39.716",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=d4",
            "self": "https://fasit.adeo.no/api/v2/environments/d4",
            "revisions": "https://fasit.adeo.no/api/v2/environments/d4/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/d4/clusters"
        }
    },
    {
        "name": "p",
        "environmentclass": "p",
        "id": 1438021,
        "created": "2016-04-15T13:04:09.251",
        "updated": "2016-06-15T08:59:39.716",
        "lifecycle": {
            "status": "rescued",
            "nextactiondate": "2017-06-15T08:59:39.711",
            "issue": "AURAGC-5335"
        },
        "accesscontrol": {
            "environmentclass": "p",
            "adgroups": []
        },
        "links": {
            "nodes": "https://fasit.adeo.no/api/v2/nodes?environment=d4",
            "self": "https://fasit.adeo.no/api/v2/environments/d4",
            "revisions": "https://fasit.adeo.no/api/v2/environments/d4/revisions",
            "clusters": "https://fasit.adeo.no/api/v2/environments/d4/clusters"
        }
    }
]