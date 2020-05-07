import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import { Card } from "material-ui/Card"
import ApplicationCard from "../../../../src/js/components/Applications/ApplicationCard.js"
import { CardInfo } from "../../../../src/js/components/common/"

describe("(Component) ApplicationCard", () => {
  it('renders "ApplicationCard" without exploding', () => {
    const wrapper = shallow(<ApplicationCard {...props} />)
    expect(wrapper).to.have.length(1)
  })

  it('renders "CardInfo" with props', () => {
    const wrapper = shallow(<ApplicationCard {...props} />)
    expect(wrapper.find(CardInfo)).to.have.length(1)
    expect(wrapper.find(CardInfo).props().lastUpdated).to.equal("2016-12-14T15:32:29.156")
  })

  it('renders "Card"', () => {
    const wrapper = shallow(<ApplicationCard {...props} />)
    expect(wrapper.find(Card)).to.have.length(1)
  })
})

const props = {
  application: {
    accesscontrol: {
      adgroups: [],
      environmentclass: "t"
    },
    artifactid: "eksempel-pep-appconfig",
    created: "2016-12-14T15:32:29.156",
    groupid: "no.nav.abac",
    id: "2068147",
    lifecycle: {},
    links: {
      instances:
        "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances?application=abac-eksempel-pep",
      revisions:
        "https://e34jbsl01655.devillo.no:8443/api/v2/applications/abac-eksempel-pep/revisions",
      self: "https://e34jbsl01655.devillo.no:8443/api/v2/applications/abac-eksempel-pep"
    },
    name: "abac-eksempel-pep",
    portoffset: 0,
    revision: 2068148,
    updated: "2016-12-14T15:32:29.156"
  },
  user: {
    authenticated: true,
    displayname: "Even Haasted",
    failedLogin: false,
    groups: ["0000-GA-AURA", "0000-GA-ENV-CONFIG-TESTADMIN", "0000-GA-ENV_CONFIG_S"],
    identity: "h141513",
    roles: ["ROLE_OPERATIONS", "ROLE_USER", "ROLE_SELFSERVICE", "ROLE_PROD_OPERATIONS"],
    showLogin: false
  },
  config: {
    fasit_applicationinstances: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances",
    fasit_applications: "https://e34jbsl01655.devillo.no:8443/api/v2/applications",
    fasit_environments: "https://e34jbsl01655.devillo.no:8443/api/v2/environments",
    fasit_lifecycle: "https://e34jbsl01655.devillo.no:8443/api/v1/lifecycle",
    fasit_navsearch: "https://e34jbsl01655.devillo.no:8443/api/v1/navsearch",
    fasit_nodes: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes",
    fasit_resources: "https://e34jbsl01655.devillo.no:8443/api/v2/resources",
    fasit_search: "https://e34jbsl01655.devillo.no:8443/api/v1/search",
    fasit_secrets: "https://e34jbsl01655.devillo.no:8443/api/v2/secrets"
  },
  revisions: {
    data: [
      {
        author: "Even Haasted",
        authorid: "h141513",
        links: {
          entity:
            "https://e34jbsl01655.devillo.no:8443/api/v2/applications/abac-eksempel-pep/revisions/2068148"
        },
        revision: "2068148",
        revisiontype: "add",
        timestamp: "2016-12-14T15:32:29.162"
      }
    ],
    isFetching: false,
    requestFailed: false
  },
  query: {},
  instances: [
    {
      application: "app1",
      environment: "p",
      version: "1",
      nodes: [],
      selftesturls: [
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
      cluster: {
        name: "app1Cluster",
        ref: "http://localhost:6969/mockapi/environments/p/clusters/app1Cluster"
      },
      appconfig: {
        ref: "http://localhost:6969/mockapi/applicationinstances/1/revisions/69/appconfig"
      },
      exposedresources: [
        {
          id: 1732091,
          revison: 1873524,
          alias: "app1Service",
          type: "baseurl",
          scope: {
            environmentclass: "p",
            environment: "p"
          },
          ref: "http://localhost:6969/mockapi/resources/1732091"
        }
      ],
      usedresources: [
        {
          id: 1732173,
          revison: 1732174,
          alias: "loadbalancer:app1",
          type: "loadbalancerconfig",
          scope: {
            environmentclass: "p",
            zone: "fss",
            environment: "p",
            application: "app1"
          },
          ref: "http://localhost:6969/mockapi/resources/1732173"
        },
        {
          id: 1732170,
          revison: 1732172,
          alias: "bigip",
          type: "loadbalancer",
          scope: {
            environmentclass: "p",
            zone: "fss",
            environment: "p",
            application: "app1"
          },
          ref: "http://localhost:6969/mockapi/resources/1732170"
        }
      ],
      missingresources: [],
      id: 1,
      revision: 69,
      created: "2016-08-09T11:02:30.581",
      updated: "2016-10-20T11:29:01.54",
      lifecycle: {},
      accesscontrol: {},
      links: {
        self: "http://localhost:6969/mockapi/applicationinstances/1684520",
        revisions: "http://localhost:6969/mockapi/applicationinstances/1684520/revisions"
      }
    }
  ]
}
