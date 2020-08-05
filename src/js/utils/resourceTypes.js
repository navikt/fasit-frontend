import React from "react"

import ResourceTypeProperty from "./ResourceTypeProperty"

export const getResourceTypeName = function (type) {
  const filteredType = Object.keys(resourceTypes).filter(
    (t) => t.toLowerCase() === type.toLowerCase()
  )
  return filteredType[0] || ""
}

const getResourceType = function (type) {
  const filteredType = Object.keys(resourceTypes).filter(
    (t) => t.toLowerCase() === type
  )
  return resourceTypes[filteredType]
}

export const resourceTypes = {
  DataSource: {
    properties: [
      textbox("url"),
      textbox("onsHosts", "ONS Hosts (Oracle DataGuard only)", false),
      textbox("oemEndpoint", "OEM endpoint (Oracle PDB only)", false),
      textbox("username"),
      vaultPath("password"),
    ],
  },
  MSSQLDataSource: {
    properties: [
      textbox("url"),
      textbox("schema"),
      textbox("username"),
      secret("password"),
    ],
  },
  DB2DataSource: {
    properties: [
      textbox("hostname"),
      textbox("port"),
      textbox("dbaname", "Database name"),
      textbox("username"),
      textbox("schema", "Schema name"),
      secret("password"),
    ],
  },
  LDAP: {
    properties: [
      textbox("url"),
      textbox("username"),
      vaultPath("password"),
      textbox("domain", "Domain", false).hintText("eg. TEST.LOCAL"),
      textbox("basedn", "Base DN", false).hintText("eg. dc=test,dc=local"),
      textbox("user.basedn", "User base DN", false).hintText(
        "eg. ou=NAV,ou=BusinessUnits,dc=test,dc=local"
      ),
      textbox("serviceuser.basedn", "Serviceuser base DN", false).hintText(
        "eg. ou=ServiceAccounts,dc=test,dc=local"
      ),
    ],
  },
  BaseUrl: {
    properties: [textbox("url")],
  },
  Credential: {
    properties: [textbox("username", "Username", false), vaultPath("password")],
  },
  Certificate: {
    properties: [
      textbox("keystorealias", "Alias in keystore"),
      secret("keystorepassword", "Keystore password"),
      file("keystore", "Keystore file"),
    ],
  },
  OpenAM: {
    properties: [
      textbox("restUrl", "Rest URL"),
      textbox("logoutUrl", "Logout URL"),
      textbox("hostname"),
      textbox("username"),
      secret("password"),
    ],
  },
  OpenIdConnect: {
    properties: [
      textbox("agentName", "Agent name"),
      secret("password"),
      textbox("hostUrl", "Host URL"),
      textbox("issuerUrl", "Issuer URL"),
      textbox("jwksUrl", "JWKS URL"),
    ],
  },
  AzureOIDC: {
    properties: [
      textbox("discoveryUri", "Discovery Uri"),
      secret("clientSecret", "Client secret"),
      textbox("clientId", "Client Id"),
      textbox("callbackUri", "Callback Uri"),
    ],
  },
  Cics: {
    properties: [
      textbox("cicsname", "CICS name"),
      textbox("url"),
      textbox("port"),
    ],
  },
  RoleMapping: {
    properties: [textarea("groups", "Users/Groups")],
  },
  QueueManager: {
    texticon: "QM",
    properties: [textbox("name"), textbox("hostname"), textbox("port")],
  },
  WebserviceEndpoint: {
    properties: [
      link("endpointUrl", "Endpoint Url"),
      dropdown("securityToken", "Security Token", [
        "NONE",
        "LTPA",
        "SAML",
        "USERNAME_TOKEN",
        "OTHER",
      ]),
      link("wsdlUrl", "WSDL Url", "WSDL artifact", false),
      textbox("description", "Description", false),
    ],
  },
  SoapService: {
    properties: [
      link("endpointUrl", "Endpoint Url"),
      dropdown("securityToken", "Security Token", [
        "NONE",
        "LTPA",
        "SAML",
        "USERNAME_TOKEN",
        "OTHER",
      ]),
      link("wsdlUrl", "WSDL Url", "WSDL artifact", false),
      textbox("description", "Description", false),
    ],
  },
  RestService: {
    properties: [textbox("url"), textbox("description", "Description", false)],
  },
  WebserviceGateway: {
    properties: [textbox("url")],
  },
  EJB: {
    properties: [
      textbox("providerUrl", "Provider Url"),
      textbox("jndi", "Jndi", false),
      textbox("beanHomeInterface", "Home Interface", false),
      textbox("beanComponentInterface", "Component Interface", false),
      textbox("description", "Description", false),
    ],
  },
  Datapower: {
    properties: [
      textbox("adminurl", "Admin Url"),
      textbox("adminweburl", "Admin Web Url"),
      textbox("username"),

      secret("password"),
    ],
  },
  EmailAddress: {
    properties: [textbox("address", "E-mail Addrress")],
  },
  SMTPServer: {
    properties: [textbox("host", "Hostname"), textbox("port")],
  },
  Queue: {
    texticon: "MQ",
    properties: [
      textbox("queueName", "Queue name"),
      textbox("queueManager", "Queue manager", false),
    ],
  },
  DeploymentManager: {
    properties: [textbox("hostname"), textbox("username"), secret("password")],
  },
  ApplicationProperties: {
    properties: [textarea("applicationProperties", "Properties")],
  },
  MemoryParameters: {
    properties: [
      textbox("minMemory", "Initial memory"),
      textbox("maxMemory", "Maximum memory"),
      textbox("permGenMemory", "Maximum permgen/metaspace", false),
    ],
  },
  LoadBalancer: {
    texticon: "f5",
    properties: [
      textbox("hostname", "Primary hostname"),
      textbox("secondary_hostname", "Secondary hostname"),
      textbox("username"),
      secret("password"),
    ],
  },
  LoadBalancerConfig: {
    properties: [
      textbox("url"),
      textbox("poolName", "Pool name"),
      textbox("contextRoots", "Context roots", false),
    ],
  },
  FileLibrary: {
    properties: [textbox("path"), textbox("nodes", "On nodes")],
  },
  Channel: {
    properties: [
      textbox("name", "Channel name").hintText("ENVNAME_APPNAME"),
      textbox("queueManager", "Queue manager", false),
    ],
  },
}

function capitalize(str) {
  return "" + str.charAt(0).toUpperCase() + str.slice(1)
}

function textbox(name, displayName, required = true) {
  return new ResourceTypeProperty(
    "textbox",
    name,
    displayName || capitalize(name),
    required
  )
}

function link(name, displayName, linkTitle, required = true) {
  const property = new ResourceTypeProperty(
    "link",
    name,
    displayName || capitalize(name),
    required
  )
  property.linktTitle = linkTitle
  return property
}

function textarea(name, displayName, required = true) {
  return new ResourceTypeProperty(
    "textarea",
    name,
    displayName || capitalize(name),
    required
  )
}

function secret(name, displayName, required = true) {
  return new ResourceTypeProperty(
    "secret",
    name,
    displayName || capitalize(name),
    required
  )
}

function dropdown(name, displayName, options) {
  const property = new ResourceTypeProperty(
    "dropdown",
    name,
    displayName || capitalize(name)
  )
  property.options = options
  return property
}

function file(name, displayName, required = false) {
  return new ResourceTypeProperty(
    "file",
    name,
    displayName || capitalize(name),
    required
  )
}

function vaultPath(name) {
  return new ResourceTypeProperty("vaultPath", name, capitalize(name), true)
}
