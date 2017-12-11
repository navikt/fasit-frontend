
if (process.env['NODE_ENV'] === 'production' || process.env ['NODE_ENV'] === 'standalone') {

console.log("getting configuration", process.env)
    exports.externalResources = {
        fasit_resources: process.env['FASIT_RESOURCES_V2_URL'],
        fasit_environments: process.env['FASIT_ENVIRONMENTS_V2_URL'],
        fasit_applications: process.env['FASIT_APPLICATIONS_V2_URL'],
        fasit_applicationinstances: process.env['FASIT_APPLICATIONINSTANCES_V2_URL'],
        fasit_secrets: process.env['FASIT_SECRETS_V2_URL'],
        fasit_nodes: process.env['FASIT_NODES_V2_URL'],
        fasit_lifecycle: process.env['FASIT_LIFECYCLE_V1_URL'],
        fasit_navsearch: process.env['FASIT_NAVSEARCH_V1_URL'],
        fasit_search: process.env['FASIT_SEARCH_V1_URL'],
        fasit_baseurl: process.env['FASIT_URL'],
        grafana: process.env['GRAFANA_URL'],
        jira: process.env['JIRA_URL'],
        sera_servers: process.env['SERA_SERVERS_V1_URL'],
        sensu_api: process.env['SENSU_API_URL']
    }
}
else {
    exports.externalResources = {
        fasit_resources: "https://e34jbsl01655.devillo.no:8443/api/v2/resources",
        fasit_environments: "https://e34jbsl01655.devillo.no:8443/api/v2/environments",
        fasit_applications: "https://e34jbsl01655.devillo.no:8443/api/v2/applications",
        fasit_applicationinstances: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances",
        fasit_secrets: "https://e34jbsl01655.devillo.no:8443/api/v2/secrets",
        fasit_nodes: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes",
        fasit_lifecycle: "https://e34jbsl01655.devillo.no:8443/api/v1/lifecycle",
        fasit_navsearch: "https://e34jbsl01655.devillo.no:8443/api/v1/navsearch",
        fasit_search: "https://e34jbsl01655.devillo.no:8443/api/v1/search",
        fasit_baseurl: "https://e34jbsl01655.devillo.no:8443",
        grafana: "https://grafana.adeo.no",
        jira: 'http://jira-q1.adeo.no',
        sera_servers: "https://sera.adeo.no/api/v1/servers",
        sensu_api: "https://sensu-api.adeo.no"
    }

}


exports.server = {
    host: process.env['HOST'] || 'localhost',
    port: process.env['PORT'] || 8080,
}