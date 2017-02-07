module.exports = {
    getNode: function (hostname) {
        return  nodes.filter(n => n.hostname === hostname)[0]
    },
    putNode: function () {
        return {}
    },
    postNode: function () {
        return {}
    },
    getNodes: function () {
        return nodes
    },


    types: ["jboss", "was", "was9", "liberty", "bpm", "bpm9", "docker", "datapower_physical", "datapower_virtual", "openam_server", "openam_proxy", "windows", "windows_terminalserver", "windows_appserver", "windows_iisserver", "windows_rptserver"],

}

const nodes =[{
            "hostname": "host1.test.local",
            "environmentclass": "t",
            "environment": "t1",
            "type": "jboss",
            "username": "deployer",
            "password": {
                "ref": "http://localhost:6969/mockapi/secrets/1584992"
            },
            "cluster": {
                "name": "pensjon-patchstatusCluster",
                "ref": "https://fasit.adeo.no/api/v2/environments/t1/clusters/pensjon-patchstatusCluster"
            },
            "applications": [
                "app1",
                "superawesomeapp"
            ],
            "id": 1,
            "created": "2016-06-20T10:00:52.064",
            "updated": "2016-09-13T13:58:54.989",
            "lifecycle": {

            },
            "accesscontrol": {
                "environmentclass": "t",
                "adgroups": ['Group1']
            },
            "links": {
                "self": "https://fasit.adeo.no/api/v2/nodes/host1.test.local",
                "revisions": "https://fasit.adeo.no/api/v2/nodes/host1.test.local/revisions"
            }
        },
        {
            "hostname": "host2.preprod.local",
            "environmentclass": "q",
            "environment": "q1",
            "type": "jboss",
            "username": "deployer",
            "password": {
                "ref": "http://localhost:6969/mockapi/secrets/1595986"
            },
            "cluster": {
                "name": "mininnboksCluster",
                "ref": "https://fasit.adeo.no/api/v2/environments/q4/clusters/mininnboksCluster"
            },
            "applications": [

            ],
            "id": 2,
            "created": "2016-06-23T12:35:34.972",
            "updated": "2016-06-23T12:35:34.972",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "q",
                "adgroups": ["Group2"]
            },
            "links": {
                "self": "https://fasit.adeo.no/api/v2/nodes/host2.preprod.local",
                "revisions": "https://fasit.adeo.no/api/v2/nodes/host2.preprod.local/revisions"
            }
        },
        {
            "hostname": "host3.devillo.no",
            "environmentclass": "u",
            "environment": "u689",
            "type": "jboss",
            "username": "deployer",
            "password": {
                "ref": "http://localhost:6969/mockapi/secrets/428317"
            },
            "cluster": {
                "name": "ereg-solrCluster",
                "ref": "https://fasit.adeo.no/api/v2/environments/t2/clusters/ereg-solrCluster"
            },
            "applications": [
                "app3"
            ],
            "id": 3,
            "created": "2014-06-16T16:30:37.347",
            "updated": "2014-06-16T16:30:37.347",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "u",
                "adgroups": ["NonExistantGroup"]
            },
            "links": {
                "self": "https://fasit.adeo.no/api/v2/nodes/host3.devillo.no",
                "revisions": "https://fasit.adeo.no/api/v2/nodes/host3.devillo.no/revisions"
            }
        },
        {
            "hostname": "host4.test.local",
            "environmentclass": "t",
            "environment": "t1",
            "type": "was",
            "username": "deployer",
            "password": {
                "ref": "http://localhost:6969/mockapi/secrets/280131"
            },
            "cluster": {
                "name": "aareg-coreCluster",
                "ref": "https://fasit.adeo.no/api/v2/environments/t0/clusters/aareg-coreCluster"
            },
            "applications": [
                "app1"
            ],
            "id": 4,
            "created": "2013-12-10T15:20:03.628",
            "updated": "2013-12-10T15:20:03.628",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "t",
                "adgroups": []
            },
            "links": {
                "self": "https://fasit.adeo.no/api/v2/nodes/d26jbsl00312.test.local",
                "revisions": "https://fasit.adeo.no/api/v2/nodes/d26jbsl00312.test.local/revisions"
            }
        },
        {
            "hostname": "prodserver.nav.no",
            "environmentclass": "p",
            "environment": "p",
            "type": "jboss",
            "username": "deployer",
            "password": {
                "ref": "http://localhost:6969/mockapi/secrets/876747"
            },
            "cluster": {
                "name": "digital-kontaktinformasjonCluster",
                "ref": "https://fasit.adeo.no/api/v2/environments/t8/clusters/digital-kontaktinformasjonCluster"
            },
            "applications": [
                "app4"
            ],
            "id": 5,
            "created": "2015-06-22T16:10:30.604",
            "updated": "2015-06-22T16:10:30.604",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "p",
                "adgroups": []
            },
            "links": {
                "self": "https://fasit.adeo.no/api/v2/nodes/d26jbsl00713.test.local",
                "revisions": "https://fasit.adeo.no/api/v2/nodes/d26jbsl00713.test.local/revisions"
            }
        }
    ]