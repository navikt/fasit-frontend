module.exports = [
    {
        "type": "DataSource",
        "requiredproperties": [
            "username",
            "url"
        ],
        "optionalproperties": [
            "oemEndpoint"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Managed JNDI datasource på server. Kan også inneholde settings for connection pool. \n\nEksponering: JNDI\nScoping: Bør spesifiseres med miljøklasse, miljø, domene og applikasjon\nNavnestandard for alias: Prefixes med applikasjonsnavn",
            "appconfiglink": "http://confluence.adeo.no/x/6osfB"
        }
    },
    {
        "type": "MSSQLDataSource",
        "requiredproperties": [
            "schema",
            "url",
            "username"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Managed JNDI datasource på server. Kan også inneholde settings for connection pool. \n\nEksponering: JNDI\nScoping: Bør spesifiseres med miljøklasse, miljø, domene og applikasjon\nNavnestandard for alias: Prefixes med applikasjonsnavn",
            "appconfiglink": "http://confluence.adeo.no/x/6osfB"
        }
    },
    {
        "type": "DB2DataSource",
        "requiredproperties": [
            "schema",
            "dbaname",
            "port",
            "username",
            "hostname"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Managed JNDI datasource på server. Kan også inneholde settings for connection pool. \n\nEksponering: JNDI\nScoping: Bør spesifiseres med miljøklasse, miljø, domene og applikasjon\nNavnestandard for alias: Prefixes med applikasjonsnavn",
            "appconfiglink": "http://confluence.adeo.no/x/6osfB"
        }
    },
    {
        "type": "LDAP",
        "requiredproperties": [
            "username",
            "url"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Applikasjonen kan konfigurere ldap som en ressurs som tilgjengeliggj�res som system properties på applikasjonsserveren.\nVed deploy vil systemet forsøke å finne  en ressurs i Fasit som matcher alias og type(LDAP)",
            "appconfiglink": "http://confluence.adeo.no/x/aX1BB"
        }
    },
    {
        "type": "BaseUrl",
        "requiredproperties": [
            "url"
        ],
        "documentation": {
            "doc": "BaseUrl er for å linke til andre tjenester og skal være på formen protokoll://server:port. \nBaseUrler skal ikke innholde noe etter \"port\" dersom dette er likt i alle miljøer.\n\nEksponering: System properties \nNavnestandard alias:  Hvis den er spesifikk for applikasjonen, prefixes den med applikasjonsnavnet. ",
            "appconfiglink": "http://confluence.adeo.no/x/g6_aBQ"
        }
    },
    {
        "type": "Credential",
        "requiredproperties": [
            "username"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "For brukernavn og passord \n\nScoping: Defineres typisk innenfor miljø, domene og miljøklasse.\nNavne-konvensjon for alias: Hvis den er spesifikk for applikasjonen, prefixes den med applikasjonsnavnet. \n",
            "appconfiglink": "http://confluence.adeo.no/x/7osfB"
        }
    },
    {
        "type": "Certificate",
        "requiredproperties": [
            "keystorealias"
        ],
        "requiredsecrets": [
            "keystorepassword"
        ],
        "requiredfiles": [
            "keystore"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/7osfB"
        }
    },
    {
        "type": "OpenAm",
        "requiredproperties": [
            "username",
            "hostname",
            "restUrl",
            "logoutUrl"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/EkAXB"
        }
    },
    {
        "type": "OpenIdConnect",
        "requiredproperties": [
            "username",
            "hostUrl",
            "jwksUrl"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Applikasjonen kan konfigurere OpenIdConnect som sikkerhetsmodul som vil opprette ISSO agent i OpenAM. Denne ressursen vil så kunne brukes for å hente ut tokens fra OpenAM",
            "appconfiglink": "https://confluence.adeo.no/x/8iBaD"
        }
    },
    {
        "type": "Cics",
        "requiredproperties": [
            "cicsname",
            "url",
            "port"
        ],
        "documentation": {
            "doc": "En container-managed ressursadapter på server som gjøres tilgjengelig for applikasjonen via jndi \n\nEksponering: JNDI \n",
            "appconfiglink": "http://confluence.adeo.no/x/qmxBB"
        }
    },
    {
        "type": "RoleMapping",
        "requiredproperties": [
            "groups"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/DowfB"
        }
    },
    {
        "type": "QueueManager",
        "requiredproperties": [
            "port",
            "hostname",
            "name"
        ],
        "documentation": {
            "doc": "Brukes for å gi en kømanager og køer konfigurert via JNDI på serveren.Kømanageren er en ressurs i fasit, mens prefix på kønavn genereres basert på miljø man deployer til. \n\nEksponering: JNDI\nNavnestandard alias: mqGateway",
            "appconfiglink": "http://confluence.adeo.no/x/NowfB"
        }
    },
    {
        "type": "WebserviceEndpoint",
        "requiredproperties": [
            "securityToken",
            "endpointUrl"
        ],
        "optionalproperties": [
            "description",
            "wsdlUrl"
        ],
        "documentation": {
            "doc": "Brukes til � definere opp web-tjenester som benyttes i applikasjonen. Disse vil bli automatisk opprettet i env-config ved deploy av en applikasjon som har definert \"exposed-services\". \n\nEksponering: System properties \nScoping: Defineres typisk innenfor miljø, domene og miljøklasse.\nNavnestandard alias:  Kortnavn på tjenesten. Se linker under:",
            "appconfiglink": "http://confluence.adeo.no/x/4YsfB"
        }
    },
    {
        "type": "RestService",
        "requiredproperties": [
            "url"
        ],
        "optionalproperties": [
            "description"
        ],
        "documentation": {
            "doc": "Brukes til å definere opp rest-tjenester som tilbys/benyttes i applikasjonen. Disse vil bli automatisk opprettet i env-config ved deploy av en applikasjon som har definert \"exposed-services\". \n\nEksponering: System properties \n",
            "appconfiglink": "http://confluence.adeo.no/x/7q_aBQ"
        }
    },
    {
        "type": "WebserviceGateway",
        "requiredproperties": [
            "url"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/4YsfB"
        }
    },
    {
        "type": "EJB",
        "requiredproperties": [
            "providerUrl"
        ],
        "optionalproperties": [
            "jndi",
            "beanHomeInterface",
            "description",
            "beanComponentInterface"
        ],
        "documentation": {
            "doc": "Brukes til å definere opp ejb-tjenester som tilbys/benyttes i applikasjonen. Disse vil bli automatisk opprettet i env-config ved deploy av en applikasjon som har definert \"exposed-services\". \n\nEksponering: System properties \n",
            "appconfiglink": "http://confluence.adeo.no/x/J0BRBQ"
        }
    },
    {
        "type": "Datapower",
        "requiredproperties": [
            "adminweburl",
            "username",
            "adminurl"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Managed JNDI datasource på server. Kan også inneholde settings for connection pool. \n\nEksponering: JNDI\nScoping: Bør spesifiseres med miljøklasse, miljø, domene og applikasjon\nNavnestandard for alias: Prefixes med applikasjonsnavn",
            "appconfiglink": "http://confluence.adeo.no/x/DowfB"
        }
    },
    {
        "type": "EmailAddress",
        "requiredproperties": [
            "address"
        ],
        "documentation": {
            "doc": "Brukes til å definere opp miljøavhengige til- og fra-epostadresser for applikasjonene. \nEksponering: System properties \nNavnestandard alias: Hvis den er spesifikk for applikasjonen, prefixes den med applikasjonsnavnet.",
            "appconfiglink": "http://confluence.adeo.no/x/46_aBQ"
        }
    },
    {
        "type": "SMTPServer",
        "requiredproperties": [
            "port",
            "host"
        ],
        "documentation": {
            "doc": "Brukes til � definere opp epostservere som brukes i applikasjonen. \n\nEksponering: System properties \nScoping: Defineres innenfor domene og miljøklasse for T og oppover. Mer spesifikt i utviklingsmiljøer, der man gjerne angir både miljø og applikasjon.\nNavnestandard alias: \"smtp\"",
            "appconfiglink": "http://confluence.adeo.no/x/mfNuB"
        }
    },
    {
        "type": "Queue",
        "requiredproperties": [
            "queueName"
        ],
        "optionalproperties": [
            "queueManager"
        ],
        "documentation": {
            "doc": "Køer konfigureres på serveren\nKøer og kanaler bestilles slik at de eksisterer på MQ-serveren. Dette skjer ikke automatisk\n\nVed deploy av myApp til t1 blir følgende generert: \nChannelName: T1_MYAPP \n",
            "appconfiglink": "http://confluence.adeo.no/x/NowfB"
        }
    },
    {
        "type": "DeploymentManager",
        "requiredproperties": [
            "username",
            "hostname"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Scoping: Bør spesifiseres med miljøklasse, miljø, domene  \n",
            "appconfiglink": "http://confluence.adeo.no/x/DowfB"
        }
    },
    {
        "type": "ApplicationProperties",
        "requiredproperties": [
            "applicationProperties"
        ],
        "documentation": {
            "doc": "Noe ganger er det bruk for å kunne sette spesifikke properties som endrer seg fra miljø til miljø som ikke passer inn i noen av de andre kategoriene. Typisk bruk av denne ressursen vil være å skru på loggnivå.\n\nEksponering: System properties \n",
            "appconfiglink": "http://confluence.adeo.no/x/tp1JB"
        }
    },
    {
        "type": "MemoryParameters",
        "requiredproperties": [
            "maxMemory",
            "minMemory"
        ],
        "optionalproperties": [
            "permGenMemory"
        ],
        "documentation": {
            "doc": "Minne parametere som angis i tekststrenger i fasit. Disse må også angis som tatt i bruk i app-config.\nDette kan våre minneinnstilliger for JVM, docker eller andre prosesser/ressurser som trenger slike innstillinger. \nSettes som tall med størrelsestype, eksempelvis: 1g eller 1024m. \n\nVed deploy av applikasjon vil innstillingene settes for applikasjonen denne er scopet til. Hvis de ikke er satt vil man benytte default oppsett (utregnet fra serverstørrelse). \n",
            "appconfiglink": "http://confluence.adeo.no/x/YDVNB"
        }
    },
    {
        "type": "LoadBalancer",
        "requiredproperties": [
            "hostname",
            "secondary_hostname",
            "username"
        ],
        "requiredsecrets": [
            "password"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/thlBB"
        }
    },
    {
        "type": "LoadBalancerConfig",
        "requiredproperties": [
            "url",
            "poolName"
        ],
        "optionalproperties": [
            "contextRoots"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/thlBB"
        }
    },
    {
        "type": "FileLibrary",
        "requiredproperties": [
            "nodes",
            "path"
        ],
        "documentation": {
            "doc": "Mangler dok",
            "appconfiglink": "http://confluence.adeo.no/x/thlBB"
        }
    },
    {
        "type": "Channel",
        "requiredproperties": [
            "name"
        ],
        "optionalproperties": [
            "queueManager"
        ],
        "documentation": {
            "doc": "For kanal \n\nScoping: Defineres typisk innenfor miljø, domene, miljøklasse og applikasjon.\nNavne-konvensjon for name: Miljønavn_Applikasjonsnavn. \n",
            "appconfiglink": "http://confluence.adeo.no/x/glhPCg"
        }
    },
    {
        "type": "SoapService",
        "requiredproperties": [
          "endpointUrl",
          "securityToken"
        ],
        "optionalproperties": [
          "description",
          "wsdlUrl"
        ],
        "documentation": {
          "doc": "Brukes til å definere opp web-tjenester som benyttes i applikasjonen. Disse vil bli automatisk opprettet i env-config ved deploy av en applikasjon som har definert \"exposed-services\". \n\nForskjellen på denne ressurstypen kontra Webservice endpoint er at denne ikke plukkes opp av provisjoneringen av tjenester til service gateway\nEksponering: System properties \nScoping: Defineres typisk innenfor miljø, domene og miljøklasse.\nNavnestandard alias:  Kortnavn på tjenesten. Se linker under:",
          "appconfiglink": "http://confluence.adeo.no/x/4YsfB"
        }
      }
]