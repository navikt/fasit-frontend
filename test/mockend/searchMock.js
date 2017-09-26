module.exports = {
    getSearch: (queryParams) => search.filter(result => queryParams.type ? result.type === queryParams.type : true)
}


const search = [
    {
        "id": 1212211,
        "name": "suchabadbutcoolhostname.com",
        "link": "http://localhost:6969/mockapi/nodes/suchabadbutcoolhostname.com",
        "type": "node",
        "info": "WAS",
        "lastchange": 1402912329491,
        "lifecycle": {
            "status": "stopped",
            "issue": "AURAGC-5934"
        },
        "detailedinfo": {
            "platformType": "WAS",
        }
    },
    {
        "id": 868933,
        "name": "jauKløsterJa",
        "link": "http://localhost:6969/mockapi/environments/p/clusters/jauKløsterJa",
        "type": "cluster",
        "info": "u1",
        "lastchange": 1433246644739,
        "lifecycle": {
            "status": "alerted",
            "issue": "AURAGC-5934"
        },
        "detailedinfo": {
            "nodes": [
                "enhost.com",
                "enannenhost.no",
                "jøssendaenhost.oera.org",
                "næmmenendaendetsynsjegvarrartneidajoda.net"
            ],
            "zone": [
                "sbs"
            ],
            "loadbalancerUrl": "https://itjenester.oera.no",
            "applications": [
                "app1:1.23",
                "app2:4.8",
                "app3:1.17",
                "app4:5.21.0.2565.1",
                "app5:2.8.893.4",
                "app6:1.17.282.5",
                "applikasjonmedetnavn:2.6.1140.3",
                "endaenapp:6.10.0.6315.5"
            ]
        }
    },
    {
        "id": 103403,
        "name": "u2",
        "link": "http://localhost:6969/mockapi/environments/esso-u2",
        "type": "environment",
        "lastchange": 1492583778425,
        "info": "",
        "lifecycle": {},
        "detailedinfo": {}
    },
    {
        "id": 407242,
        "name": "someapp",
        "link": "http://localhost:6969/mockapi/applications/bisys",
        "type": "application",
        "info": "",
        "lastchange": 1491558188020,
        "lifecycle": {},
        "detailedinfo": {
            "portOffset": "0",
            "artifactId": "appconfig-artifactid",
            "groupdId": "no.nav.someapp"
        }
    },
    {
        "id": 279177,
        "name": "wasDmgr",
        "link": "http://localhost:6969/mockapi/resources/279177",
        "type": "resource",
        "info": "DeploymentManager | u/FSS/u2/-",
        "lastchange": 1386574313728,
        "lifecycle": {},
        "detailedinfo": {
            "hostname": "viswas.expensive.com",
            "scope": "u/FSS/u2/-",
            "type": "deploymentmanager",
            "username": "deployer"
        }
    },
    {
        "id": 826420,
        "name": "anapp:3.25.4.build_257",
        "link": "http//localhost:6969/mockapi/applicationinstances/826420",
        "type": "instance",
        "info": "anapp:3.25.4.build_257",
        "lastchange": 1484561429096,
        "lifecycle": {},
        "detailedinfo": {
            "cluster": "applikasjonsgruppe:reallyCoolClusterCluster",
            "application": "someapp",
            "ports": [],
            "version": "3.25.4.build_257"
        }
    },
    {
        "id": 1536733,
        "name": "THIS_IS_A_QUEUE",
        "link": "http://localhost:6969/mockapi/resources/1536733",
        "type": "resource",
        "info": "Queue | p/FSS/p/oppdrag",
        "lastchange": 1494493054426,
        "lifecycle": {},
        "detailedinfo": {
            "queueName": "QA.DEV_THIS_IS_A_QUEUE",
            "scope": "p/FSS/p/oppdrag",
            "type": "queue",
            "undefinedStuffThatShouldnotBeSeen": ""
        }
    },
    {
        "id": 506390,
        "name": "apppropz",
        "link": "http://localhost:6969/mockapi/resources/506390",
        "type": "resource",
        "info": "ApplicationProperties | t/FSS/-/-",
        "lastchange": 1494493044426,
        "lifecycle": {},
        "detailedinfo": {
            "scope": "t/FSS/-/-",
            "applicationProperties": "bisys-logging.performance.niva=INFO\r\nbisys-logging.system.niva=DEBUG\r\nbisys-logging.oppdrag.niva=INFO\r\nbisys-logging.sfe.niva=INFO\r\nbisys-logging.leselogg.niva=INFO\r\nbisys-logging.batch.niva=DEBUG\r\nbisys-logging.trygdeetaten.niva=WARN\r\nbisys-logging.org.apache.niva=ERROR\r\nbisys-logging.org.displaytag.niva=ERROR\r\nbisys-logging.org.hibernate.niva=ERROR\r\nbisys-logging.org.hibernate.jdbcexception.niva=OFF\r\nbisys-logging.sf.hibernate.niva=ERROR\r\nbisys-logging.org.springframework.niva=ERROR\r\nbisys-logging.sf.ehcache.niva=ERROR\r\nbisys-logging.ibm.ws.niva=ERROR",
            "type": "applicationproperties"
        }
    },
    {
        "id": 830929,
        "name": "BidragDataSource",
        "link": "http://localhost:6969/mockapi/resources/830929",
        "type": "resource",
        "info": "DB2DataSource | q/FSS/o1/-",
        "lastchange": 1464790636282,
        "lifecycle": {},
        "detailedinfo": {
            "schema": "SCHEMANAME",
            "hostname": "dbserver.local",
            "port": "5069",
            "scope": "q/FSS/o1/-",
            "dbaname": "ADBNAME",
            "type": "db2datasource",
            "username": "AUSERNAME"
        }
    },
    {
        "id": 103358,
        "name": "t1",
        "link": "http://localhost:6969/mockapi/environments/t1",
        "type": "environment",
        "info": "",
        "lifecycle": {},
        "detailedinfo": {}
    },
    {
        "id": 1435966,
        "name": "anotherapp:0.1.491",
        "link": "http://localhost:6969/mockapi/applicationinstances/1435966",
        "type": "appconfig",
        "info": "anotherapp:0.1.491",
        "lastchange": 1498803889101,
        "lifecycle": {},
        "detailedinfo": {
            "cluster": "veiledningarbeidssokerCluster",
            "appConfig": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><ns2:application xmlns:ns2=\"http://appconfig.aura.nav.no\"><ns2:name>veiledningarbeidssoker</ns2:name><ns2:selftest><ns2:path>veiledearbeidssoker/internal/selftest.json</ns2:path><ns2:humanReadablePath>veiledearbeidssoker/internal/selftest</ns2:humanReadablePath></ns2:selftest><ns2:loadBalancer isAlive=\"/veiledearbeidssoker/internal/isAlive\"/><ns2:resources><ns2:baseUrl mapToProperty=\"appres.cms\" alias=\"appres.cms\"/><ns2:baseUrl mapToProperty=\"enonic.www.cms\" alias=\"enonic.www.cms\"/><ns2:fileLibrary mapToProperty=\"folder.ledetekster\" alias=\"veiledningarbeidssoker.ledetekster.v1\"/></ns2:resources><ns2:exposed-services/><ns2:artifacts><ns2:ear startUpOrder=\"10\" groupId=\"no.nav.sbl\" artifactId=\"veiledningarbeidssoker-ear\"/></ns2:artifacts><ns2:serverOptions><ns2:memoryParameters resourceAlias=\"brukerdialog-memparams\"/></ns2:serverOptions><ns2:security><ns2:logins><ns2:openAm><ns2:contextRoot>veiledearbeidssoker</ns2:contextRoot></ns2:openAm></ns2:logins></ns2:security></ns2:application>",
            "application": "anotherapp",
            "selftestPath": "veiledearbeidssoker/internal/selftest.json",
            "ports": [],
            "version": "0.1.491"
        }
    }
]