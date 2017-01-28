module.exports = {
    getApplications: () => applications,
    getApplication: (application) => applications.filter(n => n.name === application)[0],
    putApplication: () => {return {}}

}

const applications = [
    {
        "name": "app1",
        "groupid": "no.group.id",
        "artifactid": "artifact1",
        "portoffset": 0,
        "id": 1,
        "created": "2014-11-26T13:46:30.201",
        "updated": "2015-01-20T15:02:46.192",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "instances": "http://localhost:9696/applicationinstances?application=app1",
            "self": "http://localhost:9696/applications/app1",
            "revisions": "http://localhost:9696/applications/app1/revisions"
        }
    },
    {
        "name": "app2",
        "groupid": "no.group.id",
        "artifactid": "artifact2",
        "portoffset": 0,
        "id": 2,
        "created": "2016-12-15T13:06:58.903",
        "updated": "2016-12-15T14:12:13.46",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "instances": "http://localhost:9696/applicationinstances?application=app2",
            "self": "http://localhost:9696/applications/app2",
            "revisions": "http://localhost:9696/applications/app2/revisions"
        }
    },
    {
        "name": "app3",
        "groupid": "no.group.id",
        "artifactid": "artifact3",
        "portoffset": 0,
        "id": 3,
        "created": "2016-03-02T15:08:37.241",
        "updated": "2016-03-02T15:08:37.241",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "instances": "http://localhost:9696/applicationinstances?application=app3",
            "self": "http://localhost:9696/applications/app3",
            "revisions": "http://localhost:9696/applications/app3/revisions"
        }
    },
    {
        "name": "app4",
        "groupid": "no.group.id",
        "artifactid": "artifact4",
        "portoffset": 0,
        "id": 4,
        "updated": "2016-06-27T13:01:17.005",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "instances": "http://localhost:9696/applicationinstances?application=app4",
            "self": "http://localhost:9696/applications/app4",
            "revisions": "http://localhost:9696/applications/app4/revisions"
        }
    },
    {
        "name": "superawesomeapp",
        "groupid": "no.group.id",
        "artifactid": "artifact5",
        "portoffset": 0,
        "id": 5,
        "created": "2015-08-21T14:02:29.426",
        "updated": "2015-08-21T14:05:59.041",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "t",
            "adgroups": []
        },
        "links": {
            "instances": "http://localhost:9696/applicationinstances?application=app5",
            "self": "http://localhost:9696/applications/app5",
            "revisions": "http://localhost:9696/applications/app5/revisions"
        }
    }
]