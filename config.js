if (process.env["NODE_ENV"] === "production" || process.env["NODE_ENV"] === "standalone") {
  console.log("getting configuration", process.env)
  exports.externalResources = {
    fasit_resources: process.env["FASIT_URL"] + "/v2/resources",
    fasit_environments: process.env["FASIT_URL"] + "/v2/environments",
    fasit_applications: process.env["FASIT_URL"] + "/v2/applications",
    fasit_applicationinstances: process.env["FASIT_URL"] + "/v2/applicationinstances",
    fasit_clusters: process.env["FASIT_URL"] + "/v2/clusters",
    fasit_secrets: process.env["FASIT_URL"] + "/v2/secrets",
    fasit_nodes: process.env["FASIT_URL"] + "/v2/nodes",
    fasit_lifecycle: process.env["FASIT_URL"] + "/v1/lifecycle",
    fasit_navsearch: process.env["FASIT_URL"] + "/v1/navsearch",
    fasit_search: process.env["FASIT_URL"] + "/v1/search",
    fasit_current_user: process.env["FASIT_URL"] + "/v2/currentuser",
    fasit_login: process.env["FASIT_URL"] + "/login",
    fasit_logout: process.env["FASIT_URL"] + "/logout",
    grafana: process.env["GRAFANA_URL"],
    jira: process.env["JIRA_URL"],
    sera_servers: process.env["SERA_SERVERS_V1_URL"] + "/api/v1/servers",
    sensu_api: process.env["SENSU_API_URL"]
  }
} else {
  exports.externalResources = {
    fasit_resources: "https://e34jbsl01655.devillo.no:8443/api/v2/resources",
    fasit_environments: "https://e34jbsl01655.devillo.no:8443/api/v2/environments",
    fasit_applications: "https://e34jbsl01655.devillo.no:8443/api/v2/applications",
    fasit_applicationinstances: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances",
    fasit_clusters: "https://e34jbsl01655.devillo.no:8443/api/v2/clusters",
    fasit_secrets: "https://e34jbsl01655.devillo.no:8443/api/v2/secrets",
    fasit_nodes: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes",
    fasit_lifecycle: "https://e34jbsl01655.devillo.no:8443/api/v1/lifecycle",
    fasit_navsearch: "https://e34jbsl01655.devillo.no:8443/api/v1/navsearch",
    fasit_search: "https://e34jbsl01655.devillo.no:8443/api/v1/search",
    grafana: "https://grafana.adeo.no",
    jira: "http://jira-q1.adeo.no",
    sera_servers: "https://sera.adeo.no/api/v1/servers",
    sensu_api: "https://sensu-api.adeo.no"
  }
}

exports.server = {
  host: process.env["HOST"] || "localhost",
  port: process.env["PORT"] || 8080
}
