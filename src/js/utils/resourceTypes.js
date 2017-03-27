export const resourceTypes = {
    DataSource: {
        properties: [
            textbox("url"),
            textbox("username"),
            textbox("oemendpoint", "OEM endpoint (Oracle PDB Only)", false),
            secret("password")]
    },
    MSSQLDataSource: {
        properties: [
            textbox("url"),
            textbox("schema"),
            textbox("username"),
            secret("password")]
    },
    DB2DataSource: {
        properties: [
            textbox("hostname"),
            textbox("port"),
            textbox("dbaname", "Database name"),
            textbox("username"),
            textbox("schema", "Schema name"),
            secret("password")]
    },
    LDAP: {
        properties: [
            textbox("url"),
            textbox("username"),
            secret("password")]
    },
    BaseUrl: {
        properties: [
            textbox("url")
        ]
    },
    Credential: {
        properties: [
            textbox("username"),
            secret("password")]
    },
    Certificate: {
        properties: [
            textbox("keystorealias", "Alias in keystore"),
            secret("keystorepassword", "Keystore password"),
            file("keystore")]
    },
    OpenAM: {
        properties: [
            textbox("resturl", "Rest URL"),
            textbox("logouturl", "Logout URL"),
            textbox("hostname"),
            textbox("username"),
            secret("password")]
    },
    Cics: {
        properties: [
            textbox("cicsname", "CICS name"),
            textbox("url"),
            textbox("port")
        ]
    },
    RoleMapping: {
        properties: [
            textarea("groups", "Users/Groups")
        ]
    },
    QueueManager: {
        properties: [
            textbox("name"),
            textbox("hostname"),
            textbox("port")
        ]
    },
    WebserviceEndpoint: {
        properties: [
            textbox("endpointurl", "Endpoint Url"),
            textbox("wsdlurl", "WSDL Url", false),
            dropdown("securityToken", "Security Token", ["NONE", "LTPA", "SAML", "USERNAME_TOKEN", "OTHER"]),
            textbox("description", "Description", false)
        ]
    },
    RestService: {
        properties: [
            textbox("url"),
            textbox("description", "Description", false),
        ]
    },
    WebserviceGateway: {
        properties: [
            textbox("url")
        ]
    },
    EJB: {
        properties: [
            textbox("providerurl", "Provider Url"),
            textbox("jndi", "Jndi", false),
            textbox("beanhomeinterface", "Home Interface", false),
            textbox("beancomponentinterface", "Component Interface", false),
            textbox("description", "Description", false)
        ]
    },
    Datapower: {
        properties: [
            textbox("adminurl", "Admin Url"),
            textbox("adminweburl", "Admin Web Url"),
            textbox("username",),

            secret("password")]
    },
    EmailAddress: {
        properties: [
            textbox("address", "E-mail Addrress")
        ]
    },
    SMTPServer: {
        properties: [
            textbox("host", "Hostname"),
            textbox("port",)
        ]
    },
    Queue: {
        properties: [
            textbox("queuename", "Queue name"),
            textbox("queuemanager", "Queue manager", false)

        ]
    },
    Topic: {
        properties: [
            textbox("topicstring", "Topic string"),
            textbox("queuemanager", "Queue manager", false)
        ]
    },
    DeploymentManager: {
        properties: [
            textbox("hostname"),
            textbox("username"),
            secret("password")]
    },
    ApplicationProperties: {
        properties: [
            textarea("applicationProperties", "Properties")
        ]
    },
    MemoryParameters: {
        properties: [
            textbox("minmemory", "Initial memory"),
            textbox("maxmemory", "Maximum memory"),
            textbox("permgenmemory", "Maximum permgen/metaspace", false)
        ]
    },
    LoadBalancer: {
        properties: [
            textbox("hostname", "Primary hostname"),
            textbox("secondary_hostname", "Secondary hostname"),
            textbox("username"),
            secret("password", "secret")]
    },
    LoadBalancerConfig: {
        properties: [
            textbox("url"),
            textbox("poolname", "Pool name"),
            textbox("contextroots", "Context roots", false)
        ]
    },
    FileLibrary: {
        properties: [
            textbox("path"),
            textbox("nodes", "On nodes")
        ]
    },
    Channel: {
        properties: [
            textbox("name", "Channel name"),
            textbox("queuemanager", "Queue manager", false)
        ]
    }
}


function capitalize(str) {
    return "" + str.charAt(0).toUpperCase() + str.slice(1)
}

function textbox(name, displayName, required = true) {
    return {name, displayName: displayName || capitalize(name), type: "textbox", required}
}

function textarea(name, displayName, required  = true) {
    return {name, displayName: displayName || capitalize(name), type: "textarea", required}
}

function secret(name, displayName, required  = true) {
    
    return {name, displayName: displayName || capitalize(name), type: "secret", required}
}

function dropdown(name, displayName, options) {
    return {name, displayName: displayName || capitalize(name), type: "dropdown", options: options.sort()}
}

function file(name, displayName, required  = true) {
    return {name, displayName: displayName || capitalize(name), type: "file", required}
}