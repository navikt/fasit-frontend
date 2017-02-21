import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai'

import ElementList from '../../../src/js/components/common/ElementList'

describe('(Component) ElementList', () => {
    it('renders when data is fetching', () => {
        expect(shallow(<ElementList data={{isFetching: true}}/>)).to.have.length(1)
    });
    it('renders when passed node as component', () => {
        expect(shallow(<ElementList data={nodes} type="nodes"/>)).to.have.length(1)
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
