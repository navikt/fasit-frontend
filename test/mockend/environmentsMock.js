module.exports = {
  getCluster: function(name, clustername) {
    return clusters
      .filter(e => e.env == name)[0]
      .clusters.filter(c => c.clustername == clustername)[0]
  },
  getClusters: env => {
    return clusters.filter(e => e.env == env)[0].clusters
  },

  getClusterRevisions: function() {
    return clusterRevisions
  },

  getClusterRevision: function() {
    return clusterRevision
  },

  getEnvironment: function(name) {
    return environments.filter(e => e.name == name)[0]
  },
  deleteEnvironment: environment =>
    environments.splice(environments.findIndex(e => e.name === environment), 1),

  findEnvironments: function(queryParams) {
    const filters = Object.keys(queryParams).filter(k => k !== "status" && k !== "pr_page")
    const lifecycleFilter = queryParams.status

    function byQueryParams(e) {
      let result = true

      filters.forEach(filter => {
        result = e[filter] === queryParams[filter]
      })
      return result
    }

    function byLifecycleStatus(s) {
      return lifecycleFilter
        ? Object.keys(s.lifecycle).length > 0 &&
            s.lifecycle.status.toLowerCase() === lifecycleFilter.toLowerCase()
        : true
    }

    return environments.filter(byQueryParams).filter(byLifecycleStatus)
  }
}

const environments = [
  {
    name: "u1",
    environmentclass: "u",
    id: 1,
    created: "2014-03-11T13:19:49.082",
    updated: "2014-03-11T13:19:49.082",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "u",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=u15",
      self: "https://fasit.adeo.no/api/v2/environments/u15",
      revisions: "https://fasit.adeo.no/api/v2/environments/u15/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/u15/clusters"
    }
  },
  {
    name: "u69",
    environmentclass: "u",
    id: 2,
    created: "2014-04-04T10:48:57.179",
    updated: "2014-04-04T10:48:57.179",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "u",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=u99",
      self: "https://fasit.adeo.no/api/v2/environments/u99",
      revisions: "https://fasit.adeo.no/api/v2/environments/u99/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/u99/clusters"
    }
  },
  {
    name: "q1",
    environmentclass: "q",
    id: 3,
    created: "2013-10-22T11:28:05.678",
    updated: "2013-10-22T11:28:05.678",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "q",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=q6",
      self: "https://fasit.adeo.no/api/v2/environments/q6",
      revisions: "https://fasit.adeo.no/api/v2/environments/q6/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/q6/clusters"
    }
  },
  {
    name: "q10",
    environmentclass: "q",
    id: 200,
    created: "2013-10-22T11:28:05.678",
    updated: "2013-10-22T11:28:05.678",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "q",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=q6",
      self: "https://fasit.adeo.no/api/v2/environments/q6",
      revisions: "https://fasit.adeo.no/api/v2/environments/q6/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/q6/clusters"
    }
  },
  {
    name: "cd-u1",
    environmentclass: "u",
    id: 2548544,
    created: "2014-04-04T10:48:57.179",
    updated: "2014-04-04T10:48:57.179",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "u",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=cd-u1",
      self: "https://fasit.adeo.no/api/v2/environments/u99",
      revisions: "https://fasit.adeo.no/api/v2/environments/u99/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/u99/clusters"
    }
  },
  {
    name: "q2",
    environmentclass: "q",
    id: 1438021,
    created: "2016-04-15T13:04:09.251",
    updated: "2016-06-15T08:59:39.716",
    lifecycle: {
      status: "alterted"
    },
    accesscontrol: {
      environmentclass: "q",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=d4",
      self: "https://fasit.adeo.no/api/v2/environments/d4",
      revisions: "https://fasit.adeo.no/api/v2/environments/d4/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/d4/clusters"
    }
  },
  {
    name: "t1",
    environmentclass: "t",
    id: 23,
    created: "2016-04-15T13:04:09.251",
    updated: "2016-06-15T08:59:39.716",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "t",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=d4",
      self: "https://fasit.adeo.no/api/v2/environments/d4",
      revisions: "https://fasit.adeo.no/api/v2/environments/d4/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/d4/clusters"
    }
  },
  {
    name: "p",
    environmentclass: "p",
    id: 1438021,
    created: "2016-04-15T13:04:09.251",
    updated: "2016-06-15T08:59:39.716",
    lifecycle: {
      status: "running"
    },
    accesscontrol: {
      environmentclass: "p",
      adgroups: []
    },
    links: {
      nodes: "https://fasit.adeo.no/api/v2/nodes?environment=d4",
      self: "https://fasit.adeo.no/api/v2/environments/d4",
      revisions: "https://fasit.adeo.no/api/v2/environments/d4/revisions",
      clusters: "https://fasit.adeo.no/api/v2/environments/d4/clusters"
    }
  }
]

const clusters = [
  {
    env: "u1",
    clusters: [
      {
        clustername: "bpm",
        zone: "fss",
        environment: "u1",
        environmentclass: "u",
        loadbalancerurl: "https://dummy.url.no:9443/",
        nodes: [
          {
            name: "host1.devillo.no",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/e34wasl00353.devillo.no"
          }
        ],
        applications: [
          {
            name: "esb-virksomhet",
            id: "1777086",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1777086"
          },
          {
            name: "esb-auth-conf",
            id: "356929",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/356929"
          },
          {
            name: "prosess-pensjon",
            id: "1777162",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1777162"
          },
          {
            name: "esb",
            id: "356932",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/356932"
          },
          {
            name: "esb-pensjon",
            id: "1777353",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1777353"
          },
          {
            name: "empty-bpm",
            id: "1645874",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1645874"
          },
          {
            name: "esb-nonenv-conf",
            id: "356930",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/356930"
          },
          {
            name: "esb-env-conf",
            id: "356931",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/356931"
          },
          {
            name: "bpm",
            id: "357004",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/357004"
          },
          {
            name: "esb-legacy",
            id: "1777277",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1777277"
          }
        ],
        id: 331415,
        created: "2014-03-13T10:59:38.913",
        updated: "2015-12-23T11:30:07.78",
        lifecycle: {
          status: "alerted"
        },
        accesscontrol: {
          environmentclass: "u",
          adgroups: []
        },
        links: {
          self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/bpm",
          revisions:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/bpm/revisions"
        }
      },
      {
        clustername: "cluster3",
        zone: "fss",
        environment: "u15",
        environmentclass: "u",
        nodes: [],
        applications: [],
        id: 2140506,
        created: "2017-01-31T15:47:48.28",
        updated: "2017-01-31T15:47:48.28",
        lifecycle: {},
        accesscontrol: {
          environmentclass: "u",
          adgroups: []
        },
        links: {
          self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster3",
          revisions:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster3/revisions"
        }
      },
      {
        clustername: "cluster4",
        zone: "fss",
        environment: "u15",
        environmentclass: "u",
        nodes: [
          {
            name: "tullenode4.devillo.no",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/tullenode4.devillo.no"
          }
        ],
        applications: [],
        id: 2140522,
        created: "2017-02-03T14:07:20.218",
        updated: "2017-02-03T14:07:20.218",
        lifecycle: {},
        accesscontrol: {
          environmentclass: "u",
          adgroups: []
        },
        links: {
          self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster4",
          revisions:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster4/revisions"
        }
      },
      {
        clustername: "cluster5",
        zone: "fss",
        environment: "u15",
        environmentclass: "u",
        nodes: [
          {
            name: "tullball.devillo.no",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/tullball.devillo.no"
          }
        ],
        applications: [],
        id: 2140535,
        created: "2017-02-03T15:04:18.821",
        updated: "2017-02-03T15:04:18.821",
        lifecycle: {},
        accesscontrol: {
          environmentclass: "u",
          adgroups: []
        },
        links: {
          self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster5",
          revisions:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/cluster5/revisions"
        }
      },
      {
        clustername: "pensjon-fss",
        zone: "fss",
        environment: "u15",
        environmentclass: "u",
        loadbalancerurl: "https://e34wasl00116.devillo.no:9443/",
        nodes: [
          {
            name: "e34wasl00116.devillo.no",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes/e34wasl00116.devillo.no"
          }
        ],
        applications: [
          {
            name: "pensjon-tekster-pselv-fss",
            id: "1584219",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/1584219"
          },
          {
            name: "pensjon-fss",
            id: "401502",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/401502"
          },
          {
            name: "trafikanten-fss",
            id: "401503",
            ref: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances/401503"
          }
        ],
        id: 331201,
        created: "2014-03-13T08:24:59.954",
        updated: "2014-05-28T09:27:06.339",
        lifecycle: {},
        accesscontrol: {
          environmentclass: "u",
          adgroups: []
        },
        links: {
          self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/pensjon-fss",
          revisions:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/u15/clusters/pensjon-fss/revisions"
        }
      }
    ]
  }
]

const clusterRevisions = [
  {
    revision: 571606,
    timestamp: "2014-09-19T14:31:09.097",
    author: "srvbasta",
    message: "Bestilt i Basta av Bamsefar",
    revisiontype: "add",
    links: {
      entity:
        "https://fasit.adeo.no/api/v2/environments/p/clusters/applikasjonsgruppe:esbCluster/revisions/571606"
    }
  }
]

const clusterRevision = {
  clustername: "revidertKløster",
  zone: "fss",
  environment: "p",
  environmentclass: "p",
  nodes: [
    {
      name: "node1.server.com",
      ref: "https://fasit.adeo.no/api/v2/nodes/node1.server.com"
    }
  ],
  applications: [
    {
      name: "app1",
      id: "571602",
      ref: "https://fasit.adeo.no/api/v2/applicationinstances/571602"
    },
    {
      name: "app2",
      id: "571603",
      ref: "https://fasit.adeo.no/api/v2/applicationinstances/571603"
    }
  ],
  id: 571598,
  revision: 571606,
  lifecycle: {},
  accesscontrol: {
    environmentclass: "p",
    adgroups: []
  },
  links: {
    self: "https://fasit.adeo.no/api/v2/environments/p/clusters/bpm",
    revisions: "https://fasit.adeo.no/api/v2/environments/p/clusters/bpm"
  }
}
