module.exports = {
    getResourceRevisions: (id) => {
        return id == 69 ? resourceRevisions : []
    },
    getResourceRevision: (params) => {
        const filtered = revisions.filter(rev => rev.revision == params.revision && rev.id == params.id)
        return filtered.length > 0 ? filtered[0] : {}
    }
}

const resourceRevisions =
    [
        {
            "revision": 1,
            "timestamp": "2014-10-29T14:19:14.764",
            "author": "Monika Køller",
            "authorid": "K138513",
            "revisiontype": "add",
            "links": {
                "entity": "https://fasit.adeo.no/api/v2/resources/679646/revisions/679648"
            }
        },
        {
            "revision": 2,
            "timestamp": "2014-10-29T14:32:41.725",
            "author": "Thao Than Nguyen",
            "authorid": "N124284",
            "message": "Endre på noe greier. Sikkert ikke viktig.",
            "revisiontype": "mod",
            "links": {
                "entity": "https://fasit.adeo.no/api/v2/resources/679646/revisions/679730"
            }
        },
        {
            "revision": 3,
            "timestamp": "2017-03-15T10:16:42.557",
            "author": "Selveste Jan Banan",
            "authorid": "Tihi",
            "message": "Blah blah blah... båring",
            "revisiontype": "mod",
            "links": {
                "entity": "https://fasit.adeo.no/api/v2/resources/679646/revisions/2328301"
            }
        }
    ]


const revisions = [
    {
        "type": "db2datasource",
        "alias": "GosysDS",
        "scope": {
            "environmentclass": "u",
            "zone": "fss",
            "environment": "u69",
            "application": "app2"
        },
        "properties": {
            "schema": "annetSkjema",
            "hostname": "ver1.kuala.lumpur",
            "port": "1234",
            "dbaname": "TullDb",
            "username": "sjelvebrukernavnetlizzom"
        },
        "secrets": {
            "password": {
                "ref": "https://fasit.adeo.no/api/v2/secrets/679647"
            }
        },
        "files": {},
        "usedbyapplications": [],
        "dodgy": false,
        "id": 69,
        "revision": 1,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "links": {
            "self": "https://fasit.adeo.no/api/v2/resources/679646",
            "revisions": "https://fasit.adeo.no/api/v2/resources/679646/revisions"
        }
    },

    {
        "type": "db2datasource",
        "alias": "GosysDS",
        "scope": {
            "environmentclass": "u",
            "zone": "fss",
        },
        "properties": {
            "schema": "rev2skjema",
            "hostname": "økologiskbanankake.com",
            "port": "4567",
            "dbaname": "rosa",
            "username": "blogg"
        },
        "secrets": {
            "password": {
                "ref": "https://fasit.adeo.no/api/v2/secrets/679729"
            }
        },
        "files": {},
        "usedbyapplications": [],
        "dodgy": false,
        "id": 69,
        "revision": 2,
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "links": {
            "self": "https://fasit.adeo.no/api/v2/resources/679646",
            "revisions": "https://fasit.adeo.no/api/v2/resources/679646/revisions"
        }
    },
    {
        "type": "db2datasource",
        "alias": "GosysDS",
        "scope": {
            "environmentclass": "t",
            "zone": "fss",
            "environment": "t1",
            "application": "app3"
        },
        "properties": {
            "schema": "rev3skjema",
            "hostname": "romrakett.se",
            "port": "3457",
            "dbaname": "yourSQL",
            "username": "emanresu"
        },
        "secrets": {
            "password": {
                "ref": "https://fasit.adeo.no/api/v2/secrets/679729"
            }
        },
        "files": {},
        "lifecyclestatus": "alerted",
        "usedbyapplications": [],
        "dodgy": false,
        "id": 69,
        "revision": 3,
        "lifecycle": {
            "status": "alerted"
        },
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "links": {
            "self": "https://fasit.adeo.no/api/v2/resources/679646",
            "revisions": "https://fasit.adeo.no/api/v2/resources/679646/revisions"
        }
    }
]