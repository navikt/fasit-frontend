import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai'

import ElementList from '../../../src/js/components/common/ElementList'

describe('(Component) ElementList', () => {
    it('renders when data is fetching', () => {
        const props = {data: {isFetching: true}}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders when fetching data failed', () => {
        const props = {data: {requestFailed: "error"}}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders when passed a map of nodes', () => {
        const props = {data: nodes, type: "nodes"}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper.children()).to.have.length(1)
    });
    it('renders when passed a map of resources', () => {
        const props = {data: resources, type: "resources"}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper.children()).to.have.length(1)
    });
    it('renders when passed a map of environments', () => {
        const props = {data: environments, type: "environments"}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper.children()).to.have.length(1)
    });
    it('renders when passed a map of applications', () => {
        const props = {data: applications, type: "applications"}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper.children()).to.have.length(1)
    });
    it('renders when passed a map of instances', () => {
        const props = {data: instances, type: "instances"}
        const wrapper = shallow(<ElementList {...props}/>)
        expect(wrapper.children()).to.have.length(1)
    });

});


const nodes = {
    "data": [{
        "hostname": "host1.test.local",
        "environmentclass": "t",
        "environment": "t1",
        "type": "jboss",
        "username": "deployer",
        "password": {"ref": "http://localhost:6969/mockapi/secrets/1584992"},
        "cluster": {
            "name": "pensjon-patchstatusCluster",
            "ref": "https://fasit.adeo.no/api/v2/environments/t1/clusters/pensjon-patchstatusCluster"
        },
        "applications": ["app1", "superawesomeapp"],
        "id": 1,
        "created": "2016-06-20T10:00:52.064",
        "updated": "2016-09-13T13:58:54.989",
        "lifecycle": {},
        "accesscontrol": {"environmentclass": "t", "adgroups": ["Group1"]},
        "links": {
            "self": "https://fasit.adeo.no/api/v2/nodes/host1.test.local",
            "revisions": "https://fasit.adeo.no/api/v2/nodes/host1.test.local/revisions"
        }
    }],
    "headers": {
        "total_count": "5",
        "date": "Tue, 21 Feb 2017 21:24:02 GMT",
        "x-powered-by": "Express",
        "content-length": "3214",
        "etag": "W/\"c8e-SOrs+t73jhTNPyUQ6uHXAw\"",
        "content-type": "application/json; charset=utf-8"
    }
}
const resources = {
    "data": [{
        "type": "baseurl",
        "alias": "tjenestebuss",
        "scope": {
            "environmentclass": "q",
            "zone": "fss",
            "environment": "q3"
        },
        "properties": {
            "url": "https://servicebus.se/"
        },
        "secrets": {},
        "files": {},
        "dodgy": false,
        "id": 1,
        "created": "2013-08-08T09:02:59.312",
        "updated": "2013-08-08T09:02:59.312",
        "lifecycle": {},
        "accesscontrol": {
            "environmentclass": "q",
            "adgroups": []
        },
        "links": {
            "self": "http://localhost:9696/resources/1",
            "revisions": "http://localhost:9696/resources/1/revisions"
        }
    }]
}

const environments = {
    data: [{
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
    }]
}

const applications = {
    data: [
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
                "instances": "http://localhost:6969/mockapi/applicationinstances?application=app1",
                "self": "http://localhost:6969/mockapi/applications/app1",
                "revisions": "http://localhost:6969/mockapi/applications/app1/revisions"
            }
        }]
}
const instances = {
    data: [
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
        }]
}