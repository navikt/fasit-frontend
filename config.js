if (process.env['NODE_ENV'] === 'production') {
    exports.externalResources = {
        fasit_resources: process.env['fasit_resources_url'],
        fasit_environments: process.env['fasit_environments_url'],
        fasit_applications: process.env['fasit_applications_url'],
        fasit_applicationinstances: process.env['fasit_applicationinstances_url'],
        fasit_secrets: process.env['fasit_secrets_url'],
        fasit_nodes: process.env['fasit_nodes_url'],
        fasit_baseurl: process.env['fasit_url'],
        grafana: process.env['grafana_url'],
        jira: process.env['jira_url'],
        sera_servers: process.env['sera_servers_url'],
        sensu_api: process.env['sensu_api_url']
    }
} else {
    exports.externalResources = {
        fasit_resources: "https://e34jbsl01655.devillo.no:8443/api/v2/resources",
        fasit_environments: "https://e34jbsl01655.devillo.no:8443/api/v2/environments",
        fasit_applications: "https://e34jbsl01655.devillo.no:8443/api/v2/applications",
        fasit_applicationinstances: "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances",
        fasit_secrets: "https://e34jbsl01655.devillo.no:8443/api/v2/secrets",
        fasit_nodes: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes",
        fasit_baseurl: "https://e34jbsl01655.devillo.no:8443",
        grafana: "https://grafana.adeo.no",
        jira: 'http://jira-q1.adeo.no',
        sera_servers: "https://sera.adeo.no/api/v1/servers",
        sensu_api: "https://sensu-api.adeo.no"
    }

}


exports.server = {
    host: process.env['HOST'] || 'localhost',
    port: process.env['PORT'] || 8443,
    tlsPrivateKey: process.env['TLS_PRIVATE_KEY'] || "localhost.key",
    tlsCert: process.env['TLS_CERT'] || "localhost.crt"
}