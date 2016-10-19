import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    fetchNodes(){
        return [{
            "hostname": "a30jbsl00030.oera.no",
            "environmentClass": "p",
            "environment": "p",
            "applications": ["brukerprofil"],
            "username": "deployer",
            "password": {"ref": "http://localhost:8089/secrets/239963"},
            "platformType": "JBOSS",
            "id": 239962,
            "created": "2013-10-08T11:35:40.026",
            "updated": "2013-10-08T11:35:40.026",
            "updatedBy": "srvorchestrator"
        }, {
            "hostname": "A01T5VW089.adeo.no",
            "environmentClass": "p",
            "environment": "p",
            "applications": ["elin"],
            "password": {"ref": "http://localhost:8089/secrets/1234792"},
            "platformType": "WINDOWS_TERMINALSERVER",
            "id": 1234791,
            "created": "2016-01-19T09:56:09.529",
            "updated": "2016-01-19T09:56:09.529",
            "updatedBy": "Cristhian Hidalgo (h140905)"
        },
            {
                "hostname": "b27wasl00388.preprod.local",
                "environmentClass": "p",
                "environment": "p",
                "applications": ["brukerprofil"],
                "username": "deployer",
                "password": {"ref": "http://localhost:8089/secrets/239963"},
                "platformType": "JBOSS",
                "id": 239962,
                "created": "2013-10-08T11:35:40.026",
                "updated": "2013-10-08T11:35:40.026",
                "updatedBy": "srvorchestrator"
            }]
    },
    render() {
        let that = this
        return (
            <div>
                <div>
                    <h1>Nodes for {this.props.params.environment}</h1>
                </div>
                <div>
                    <ul>
                        {this.fetchNodes().map(function (node) {
                            return <li key={node.hostname}><Link to={"/environments/" + that.props.params.environment + '/nodes/' + node.hostname}>{node.hostname}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
})