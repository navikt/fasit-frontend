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
        sera_servers: process.env['sera_servers_url'],
        sensu_api: process.env['sensu_api_url']
    }
} else {
    exports.externalResources = {
        fasit_resources: "http://e34jbsl01655.devillo.no:8080/api/v2/resources",
        fasit_environments: "http://e34jbsl01655.devillo.no:8080/api/v2/environments",
        fasit_applications: "http://e34jbsl01655.devillo.no:8080/api/v2/applications",
        fasit_applicationinstances: "http://e34jbsl01655.devillo.no:8080/api/v2/applicationinstances",
        fasit_secrets: "http://e34jbsl01655.devillo.no:8080/api/v2/secrets",
        fasit_nodes: "http://e34jbsl01655.devillo.no:8080/api/v2/nodes",
        fasit_baseurl: "http://e34jbsl01655.devillo.no:8080",
        grafana: "https://grafana.adeo.no",
        sera_servers: "https://sera.adeo.no/api/v1/servers",
        sensu_api: "https://sensu-api.adeo.no"
    }

}


exports.server = {
    host: process.env['HOST'] || 'localhost',
    port: process.env['PORT'] || 4242,
    tlsPrivateKey: process.env['TLS_PRIVATE_KEY'] || "localhost.key",
    tlsCert: process.env['TLS_CERT'] || "localhost.crt"
}