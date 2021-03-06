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
  fasit_logout: process.env["FASIT_URL"] + "/logout"
}

exports.server = {
  host: process.env["HOST"] || "localhost",
  port: process.env["PORT"] || 8080
}
