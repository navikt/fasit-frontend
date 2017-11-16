import React from "react";
import {blueGrey800, deepPurple400, green500, orange400, redA700} from "material-ui/styles/colors";
import {colors} from "../commonStyles/commonInlineStyles";
import Avatar from "material-ui/Avatar";
import ResourceTypeProperty from "./ResourceTypeProperty"


const DEFAULT_BACKGROUND_COLOR = colors.avatarBackgroundColor
const DEFAULT_COLOR = colors.white

export const getResourceTypeName = function (type) {
    const filteredType = Object.keys(resourceTypes).filter(t => t.toLowerCase() === type.toLowerCase())
    return filteredType[0] || "Unknown type"
}

export const resourceTypeIcon = function (type) {
    const resourceType = getResourceType(type)
    return (<Avatar
        backgroundColor={resourceType.backgroundColor || DEFAULT_BACKGROUND_COLOR}
        color={resourceType.color || DEFAULT_COLOR}>
        {resourceType.texticon ? resourceType.texticon : getIcon(resourceType)}
    </Avatar>)
}

const getIcon = function (resourceType) {
    return <i className={resourceType.icon || "fa fa-cogs"} />
}

const getResourceType = function (type) {
    const filteredType = Object.keys(resourceTypes).filter(t => t.toLowerCase() === type)
    return resourceTypes[filteredType];
}

export const resourceTypes = {
    DataSource: {
        icon: "fa fa-database",
        backgroundColor: redA700,
        color: colors.white,
        properties: [
            textbox("url"),
            textbox("username"),
            textbox("oemEndpoint", "OEM endpoint (Oracle PDB Only)", false),
            secret("password")]
    },
    MSSQLDataSource: {
        icon: "fa fa-database",
        properties: [
            textbox("url"),
            textbox("schema"),
            textbox("username"),
            secret("password")]
    },
    DB2DataSource: {
        backgroundColor: green500,
        color: colors.white,
        icon: "fa fa-database",
        properties: [
            textbox("hostname"),
            textbox("port"),
            textbox("dbaname", "Database name"),
            textbox("username"),
            textbox("schema", "Schema name"),
            secret("password")]
    },
    LDAP: {
        icon: "fa fa-vcard",
        properties: [
            textbox("url"),
            textbox("username"),
            secret("password"),
            textbox("domain", "Domain", false).hintText("eg. TEST.LOCAL"),
            textbox("basedn", "Base DN", false).hintText("eg. dc=test,dc=local"),
            textbox("user.basedn", "User base DN", false).hintText("eg. ou=NAV,ou=BusinessUnits,dc=test,dc=local"),
            textbox("serviceuser.basedn", "Serviceuser base DN", false).hintText("eg. ou=ServiceAccounts,dc=test,dc=local")]
    },
    BaseUrl: {
        icon: "fa fa-link",
        properties: [
            textbox("url")
        ]
    },
    Credential: {
        icon: "fa fa-key",
        properties: [
            textbox("username"),
            secret("password")]
    },
    Certificate: {
        icon: "fa fa-drivers-license",
        properties: [
            textbox("keystorealias", "Alias in keystore"),
            secret("keystorepassword", "Keystore password"),
            file("keystore", "Keystore file")]
    },
    OpenAM: {
        backgroundColor: blueGrey800,
        color: orange400,
        icon: "fa fa-sign-in",
        properties: [
            textbox("resturl", "Rest URL"),
            textbox("logouturl", "Logout URL"),
            textbox("hostname"),
            textbox("username"),
            secret("password")]
    },
    Cics: {
        icon: "fa fa-tty",
        properties: [
            textbox("cicsname", "CICS name"),
            textbox("url"),
            textbox("port")
        ]
    },
    RoleMapping: {
        icon: "fa fa-users",
        properties: [
            textarea("groups", "Users/Groups")
        ]
    },
    QueueManager: {
        backgroundColor: deepPurple400,
        color: colors.white,
        texticon: "QM",
        properties: [
            textbox("name"),
            textbox("hostname"),
            textbox("port")
        ]
    },
    WebserviceEndpoint: {
        icon: "fa fa-bookmark",
        properties: [
            link("endpointUrl", "Endpoint Url"),
            dropdown("securityToken", "Security Token", ["NONE", "LTPA", "SAML", "USERNAME_TOKEN", "OTHER"]),
            link("wsdlUrl", "WSDL Url", "WSDL artifact", false),
            textbox("description", "Description", false)
        ]
    },
    RestService: {
        icon: "fa fa-link",
        properties: [
            textbox("url"),
            textbox("description", "Description", false),
        ]
    },
    WebserviceGateway: {
        icon: "fa fa-map-signs",
        properties: [
            textbox("url")
        ]
    },
    EJB: {
        icon: "fa fa-exclamation",
        properties: [
            textbox("providerUrl", "Provider Url"),
            textbox("jndi", "Jndi", false),
            textbox("beanHomeInterface", "Home Interface", false),
            textbox("beanComponentInterface", "Component Interface", false),
            textbox("description", "Description", false)
        ]
    },
    Datapower: {
        backgroundColor: deepPurple400,
        color: colors.white,
        icon: "fa fa-money",
        properties: [
            textbox("adminurl", "Admin Url"),
            textbox("adminweburl", "Admin Web Url"),
            textbox("username", ),

            secret("password")]
    },
    EmailAddress: {
        icon: "fa fa-envelope",
        properties: [
            textbox("address", "E-mail Addrress")
        ]
    },
    SMTPServer: {
        icon: "fa fa-server",
        properties: [
            textbox("host", "Hostname"),
            textbox("port", )
        ]
    },
    Queue: {
        backgroundColor: deepPurple400,
        color: colors.white,
        texticon: "MQ",
        properties: [
            textbox("queueName", "Queue name"),
            textbox("queueManager", "Queue manager", false)

        ]
    },
    Topic: {
        backgroundColor: deepPurple400,
        color: colors.white,
        texticon: "T",
        properties: [
            textbox("topicString", "Topic string"),
            textbox("queueManager", "Queue manager", false)
        ]
    },
    DeploymentManager: {
        backgroundColor: deepPurple400,
        color: colors.white,
        icon: "fa fa-dashboard",
        properties: [
            textbox("hostname"),
            textbox("username"),
            secret("password")]
    },
    ApplicationProperties: {
        icon: "fa fa-file-text",
        properties: [
            textarea("applicationProperties", "Properties")
        ]
    },
    MemoryParameters: {
        icon: "fa fa-microchip",
        properties: [
            textbox("minMemory", "Initial memory"),
            textbox("maxMemory", "Maximum memory"),
            textbox("permGenMemory", "Maximum permgen/metaspace", false)
        ]
    },
    LoadBalancer: {
        backgroundColor: redA700,
        color: colors.white,
        texticon: "f5",
        properties: [
            textbox("hostname", "Primary hostname"),
            textbox("secondary_hostname", "Secondary hostname"),
            textbox("username"),
            secret("password")]
    },
    LoadBalancerConfig: {
        backgroundColor: redA700,
        color: colors.white,
        icon: "fa fa-balance-scale",
        properties: [
            textbox("url"),
            textbox("poolName", "Pool name"),
            textbox("contextRoots", "Context roots", false)
        ]
    },
    FileLibrary: {
        icon: "fa fa-folder",
        properties: [
            textbox("path"),
            textbox("nodes", "On nodes")
        ]
    },
    Channel: {
        backgroundColor: deepPurple400,
        color: colors.white,
        icon: "fa fa-exchange",
        properties: [
            textbox("name", "Channel name").hintText("ENVNAME_APPNAME"),
            textbox("queueManager", "Queue manager", false)
        ]
    }
}

function capitalize(str) {
    return "" + str.charAt(0).toUpperCase() + str.slice(1)
}

function textbox(name, displayName, required = true) {
    return new ResourceTypeProperty("textbox", name, displayName || capitalize(name), required)
}

function link(name, displayName, linkTitle, required = true) {
    const property = new ResourceTypeProperty("link", name, displayName || capitalize(name), required)
    property.linktTitle = linkTitle
    return property
}

function textarea(name, displayName, required = true) {
    return new ResourceTypeProperty("textarea", name, displayName || capitalize(name), required)
}

function secret(name, displayName, required = true) {
    return new ResourceTypeProperty("secret", name, displayName || capitalize(name), required)
}

function dropdown(name, displayName, options) {
    const property = new ResourceTypeProperty("dropdown", name, displayName || capitalize(name))
    property.options = options
    return property
}

function file(name, displayName, required = true) {
    return new ResourceTypeProperty("file", name, displayName || capitalize(name), required)
}