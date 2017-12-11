import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import sinon from "sinon"
import { Applications } from "../../../../src/js/components/Applications/Applications"
import ApplicationCard from "../../../../src/js/components/Applications/ApplicationCard"


describe('(Component) Applications', () => {

    it('renders "Applications" without exploding', () => {
        const wrapper = shallow(<Applications {...props}/>)
        expect(wrapper).to.have.length(1)
    })

    it('renders "Application" and fetches correct data', () => {
        const dispatch = sinon.spy()
        const wrapper = shallow(<Applications {...props} dispatch={dispatch}/>)
        wrapper.instance().componentDidMount()
        expect(dispatch.args[0][0].type).to.equal("SUBMIT_FILTER_SEARCH")
        expect(dispatch.args[0][0].location).to.equal("applications")
    })

    it('renders "Application" with loading animation if isFetching', () => {
        const wrapper = shallow(<Applications {...props} isFetching={true}/>)
        expect(wrapper.find('div.element-list')).to.have.length(1)
    })

    it('renders "Application" and returns list of applications', () => {
        const wrapper = shallow(<Applications {...props} params={{...props.params, application: ""}}/>)
        expect(wrapper.find('div.main-content-container')).to.have.length(1)
        expect(wrapper.find(ApplicationCard)).to.have.length(3)
    })
})

const props = {
    "history": {},
    "location": {
        "pathname": "/applications/a-inntekt",
        "search": "",
        "hash": "",
        "state": null,
        "action": "PUSH",
        "key": "t7yg2c",
        "query": {},
        "$searchBase": {
            "search": "",
            "searchBase": ""
        }
    },
    "params": {
        "application": "a-inntekt"
    },
    "route": {
        "path": "/applications(/:application)"
    },
    "routeParams": {
        "application": "a-inntekt"
    },
    "routes": [
        {
            "path": "/",
            "indexRoute": {},
            "childRoutes": [
                {
                    "path": "/search(/:query)"
                },
                {
                    "path": "/nodes(/:node)"
                },
                {
                    "path": "/environments(/:environment)"
                },
                {
                    "path": "/environments(/:environment)/clusters"
                },
                {
                    "path": "/environments(/:environment)/clusters(/:clusterName)"
                },
                {
                    "path": "/environments(/:environment)/nodes"
                },
                {
                    "path": "/environments(/:environment)/instances"
                },
                {
                    "path": "/applications(/:application)"
                },
                {
                    "path": "/resources(/:resource)"
                },
                {
                    "path": "/instances(/:instance)"
                },
                {
                    "path": "*"
                }
            ]
        },
        {
            "path": "/applications(/:application)"
        }
    ],
    "children": null,
    "applications": [
        {
            "name": "a-inntekt",
            "groupid": "no.nav",
            "artifactid": "a-inntekt-config",
            "portoffset": 0,
            "id": 618258,
            "created": "2014-10-07T13:23:21.972",
            "updated": "2014-10-07T13:24:01.43",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "t",
                "adgroups": []
            },
            "links": {
                "instances": "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances?application=a-inntekt",
                "self": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/a-inntekt",
                "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/a-inntekt/revisions"
            }
        },
        {
            "name": "aareg-core",
            "groupid": "no.nav.aareg-core",
            "artifactid": "aareg-core-config",
            "portoffset": 0,
            "id": 3833,
            "created": "2013-04-15T12:00:12.69",
            "updated": "2013-05-21T14:14:14.854",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "t",
                "adgroups": []
            },
            "links": {
                "instances": "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances?application=aareg-core",
                "self": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/aareg-core",
                "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/aareg-core/revisions"
            }
        },
        {
            "name": "aareg-mldpusher",
            "groupid": "no.nav.aareg.mldpusher",
            "artifactid": "mldpusher-config",
            "portoffset": 0,
            "id": 2704027,
            "created": "2017-06-13T15:04:48.226",
            "updated": "2017-06-13T15:04:48.226",
            "lifecycle": {},
            "accesscontrol": {
                "environmentclass": "t",
                "adgroups": []
            },
            "links": {
                "instances": "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances?application=aareg-mldpusher",
                "self": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/aareg-mldpusher",
                "revisions": "https://e34jbsl01655.devillo.no:8443/api/v2/applications/aareg-mldpusher/revisions"
            }
        },

    ],
    "totalCount": "3",
    "isFetching": false
}




