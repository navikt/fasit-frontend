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

  getEnvironmentRevisions: function() {
    return environmentRevisions
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=u15",
      self: "http://localhost:4242/mockapi/v2/environments/u15",
      revisions: "http://localhost:4242/mockapi/v2/environments/u15/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/u15/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=u99",
      self: "http://localhost:4242/mockapi/v2/environments/u99",
      revisions: "http://localhost:4242/mockapi/v2/environments/u99/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/u99/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=q6",
      self: "http://localhost:4242/mockapi/v2/environments/q6",
      revisions: "http://localhost:4242/mockapi/v2/environments/q6/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/q6/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=q6",
      self: "http://localhost:4242/mockapi/v2/environments/q6",
      revisions: "http://localhost:4242/mockapi/v2/environments/q6/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/q6/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=cd-u1",
      self: "http://localhost:4242/mockapi/v2/environments/u99",
      revisions: "http://localhost:4242/mockapi/v2/environments/u99/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/u99/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=d4",
      self: "http://localhost:4242/mockapi/v2/environments/d4",
      revisions: "http://localhost:4242/mockapi/v2/environments/d4/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/d4/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=d4",
      self: "http://localhost:4242/mockapi/v2/environments/d4",
      revisions: "http://localhost:4242/mockapi/v2/environments/d4/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/d4/clusters"
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
      nodes: "http://localhost:4242/mockapi/v2/nodes?environment=d4",
      self: "http://localhost:4242/mockapi/v2/environments/d4",
      revisions: "http://localhost:4242/mockapi/v2/environments/d4/revisions",
      clusters: "http://localhost:4242/mockapi/v2/environments/d4/clusters"
    }
  }
]

const environmentRevisions = [
    {
        "revision": 12,
        "timestamp": "2016-02-23T09:32:40.839",
        "author": "Fetter Anton",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/12"
        },
        "onbehalfof": null,
        "authorid": "a123456",
        "revisiontype": "add"
    },
    {
        "revision": 19,
        "timestamp": "2016-02-23T09:36:01.428",
        "author": "Fetter Anton",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/19"
        },
        "onbehalfof": null,
        "authorid": "a123456",
        "revisiontype": "mod"
    },
    {
        "revision": 22,
        "timestamp": "2016-02-23T09:36:55.692",
        "author": "Fetter Anton",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/22"
        },
        "onbehalfof": null,
        "authorid": "a123456",
        "revisiontype": "mod"
    },
    {
        "revision": 25,
        "timestamp": "2016-02-23T09:37:39.569",
        "author": "Fetter Anton",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/25"
        },
        "onbehalfof": null,
        "authorid": "a123456",
        "revisiontype": "mod"
    },
    {
        "revision": 28,
        "timestamp": "2016-02-23T09:38:02.584",
        "author": "Fetter Anton",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/28"
        },
        "onbehalfof": null,
        "authorid": "a123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2230,
        "timestamp": "2016-10-21T14:15:41.563",
        "author": "Sten Ivar Røkke",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2230"
        },
        "onbehalfof": null,
        "authorid": "R137915",
        "revisiontype": "mod"
    },
    {
        "revision": 2233,
        "timestamp": "2016-10-21T14:16:01.926",
        "author": "Sten Ivar Røkke",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2233"
        },
        "onbehalfof": null,
        "authorid": "R137915",
        "revisiontype": "mod"
    },
    {
        "revision": 2245,
        "timestamp": "2016-10-25T15:16:48.688",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2245"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2248,
        "timestamp": "2016-10-25T15:17:13.042",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2248"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2249,
        "timestamp": "2016-10-25T15:17:19.033",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2249"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2250,
        "timestamp": "2016-10-25T15:17:21.955",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2250"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2253,
        "timestamp": "2016-10-25T15:17:34.397",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2253"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2256,
        "timestamp": "2016-10-25T15:17:59.424",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2256"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2260,
        "timestamp": "2016-10-25T15:18:48.607",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2260"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2263,
        "timestamp": "2016-10-25T15:19:06.681",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2263"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2839,
        "timestamp": "2016-12-19T10:23:16.994",
        "author": "Onkel Skrue",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2839"
        },
        "onbehalfof": null,
        "authorid": "s123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2843,
        "timestamp": "2016-12-19T10:24:58.876",
        "author": "Onkel Skrue",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2843"
        },
        "onbehalfof": null,
        "authorid": "s123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2847,
        "timestamp": "2016-12-19T13:37:24.432",
        "author": "Onkel Skrue",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2847"
        },
        "onbehalfof": null,
        "authorid": "s123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2981,
        "timestamp": "2017-01-13T14:34:11.843",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2981"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 2985,
        "timestamp": "2017-01-13T14:35:49.911",
        "author": "Donald Duck",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/2985"
        },
        "onbehalfof": null,
        "authorid": "d123456",
        "revisiontype": "mod"
    },
    {
        "revision": 11865,
        "timestamp": "2025-07-11T16:16:49.735",
        "author": "Kari Nordmann",
        "message": null,
        "links": {
            "entity": "https://fasit.dev.intern.nav.no/api/v2/environments/cd-u1/revisions/11865"
        },
        "onbehalfof": null,
        "authorid": "n123456",
        "revisiontype": "mod"
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
  },
  {env: "p",
   clusters: [
    {
        "id": 2978,
        "revision": null,
        "created": "2017-01-13T13:34:11.680",
        "updated": "2017-01-13T13:34:11.680",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/auraCluster",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/auraCluster/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "e34apvl00160.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/e34apvl00160.devillo.no"
            },
            {
                "name": "e34apvl00161.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/e34apvl00161.devillo.no"
            }
        ],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "auraCluster",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2984,
        "revision": null,
        "created": "2017-01-13T13:35:49.890",
        "updated": "2017-01-13T13:35:49.890",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/auraCluster_0.8869005389912195",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/auraCluster_0.8869005389912195/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "auraCluster_0.8869005389912195",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2836,
        "revision": null,
        "created": "2016-12-19T09:23:16.743",
        "updated": "2016-12-19T09:23:16.743",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster4",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster4/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "tullenode2000.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/tullenode2000.devillo.no"
            }
        ],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "cluster4",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2840,
        "revision": null,
        "created": "2016-12-19T09:24:58.837",
        "updated": "2016-12-19T09:24:58.837",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster5",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster5/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "tullenode2001.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/tullenode2001.devillo.no"
            }
        ],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "cluster5",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2844,
        "revision": null,
        "created": "2016-12-19T12:37:24.408",
        "updated": "2016-12-19T12:37:24.408",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster6",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/cluster6/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "tullenode2002.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/tullenode2002.devillo.no"
            }
        ],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "cluster6",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2258,
        "revision": null,
        "created": "2016-10-25T13:18:48.565",
        "updated": "2016-10-25T13:18:48.565",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/docker-testappCluster",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/docker-testappCluster/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [],
        "applications": [
            {
                "name": "docker-testapp",
                "id": "2259",
                "ref": "https://fasit.dev.intern.nav.no/applicationinstances/2259"
            }
        ],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "docker-testappCluster",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2246,
        "revision": null,
        "created": "2016-10-25T13:17:12.917",
        "updated": "2016-10-25T13:17:12.917",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/jboss-testappCluster",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/jboss-testappCluster/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "e34jbsl01658.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/e34jbsl01658.devillo.no"
            }
        ],
        "applications": [
            {
                "name": "jboss-testapp",
                "id": "2247",
                "ref": "https://fasit.dev.intern.nav.no/applicationinstances/2247"
            }
        ],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "jboss-testappCluster",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 11864,
        "revision": null,
        "created": "2025-07-11T14:16:49.691",
        "updated": "2025-07-11T14:16:49.691",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/testclustert",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/testclustert/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [],
        "applications": [],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "testclustert",
        "environmentclass": "u",
        "loadbalancerurl": null
    },
    {
        "id": 2251,
        "revision": null,
        "created": "2016-10-25T13:17:34.360",
        "updated": "2016-10-25T13:17:34.360",
        "lifecycle": {
            "status": null
        },
        "links": {
            "self": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/was-testappCluster",
            "revisions": "https://fasit.dev.intern.nav.no/api/v2/environments/p/clusters/was-testappCluster/revisions"
        },
        "zone": "fss",
        "environment": "p",
        "nodes": [
            {
                "name": "e34wasl00385.devillo.no",
                "id": null,
                "ref": "https://fasit.dev.intern.nav.no/api/v2/nodes/e34wasl00385.devillo.no"
            }
        ],
        "applications": [
            {
                "name": "was-testapp",
                "id": "2252",
                "ref": "https://fasit.dev.intern.nav.no/applicationinstances/2252"
            }
        ],
        "updatedby": null,
        "accesscontrol": {
            "environmentclass": "u",
            "adgroups": []
        },
        "clustername": "was-testappCluster",
        "environmentclass": "u",
        "loadbalancerurl": null
    }
]}
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
        "http://localhost:4242/mockapi/v2/environments/p/clusters/applikasjonsgruppe:esbCluster/revisions/571606"
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
      ref: "http://localhost:4242/mockapi/v2/nodes/node1.server.com"
    }
  ],
  applications: [
    {
      name: "app1",
      id: "571602",
      ref: "http://localhost:4242/mockapi/v2/applicationinstances/571602"
    },
    {
      name: "app2",
      id: "571603",
      ref: "http://localhost:4242/mockapi/v2/applicationinstances/571603"
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
    self: "http://localhost:4242/mockapi/v2/environments/p/clusters/bpm",
    revisions: "http://localhost:4242/mockapi/v2/environments/p/clusters/bpm"
  }
}
