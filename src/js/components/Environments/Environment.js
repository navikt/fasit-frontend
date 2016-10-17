import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import NavLink from '../Navigation/NavLink'


class Environment extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    fetchClusters(){
        return [{"name": "app1-cluster", "applications": ["first", "second"], "nodes": ["n1", "n2"]},
            {"name": "app2-cluster", "applications": ["first", "second"], "nodes": ["n1", "n2"]},
            {"name": "app3-cluster", "applications": ["first", "second"], "nodes": ["n1", "n2"]},
            {"name": "app4-clusterp", "applications": ["first", "second"], "nodes": ["n1", "n2"]}]
    }
    fetchApplications(){
        return ({"name": "OpenAM", "gid": "no.nav.esso", "aid": "openam"})
    }
    fetchEnvironment(){
        return {
            "environmentName": "t1000",
            "environmentClass": "t",
            "nodes": ["b27wasl00388.preprod.local"],
            "applicationinstances": ["pensjon"],
            "clusters": ["pensjonscluster"],
            "wasDmgr": "http://bs.was.com",
            "bpmDmgr": "http://bs.bpm.com",

        }
    }

    render() {
        const {environments, activeIndex} = this.props
        const environment = this.props.params ? this.props.params.environment : environments[activeIndex].name
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h5 className="panel-title">Environment - {environment}</h5>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-9">
                            <ul className="nav nav-tabs">
                                <li role="presentation"><NavLink
                                    to={"/environments/" + environment  }
                                    onlyActiveOnIndex>Overview</NavLink>
                                </li>
                                <li role="presentation"><NavLink
                                    to={"/environments/" + environment + "/instances"}>Instances</NavLink>
                                </li>
                                <li role="presentation"><NavLink
                                    to={"/environments/" + environment + "/nodes"}>Nodes</NavLink>
                                </li>
                                <li role="presentation"><NavLink
                                    to={"/environments/" + environment + "/clusters"}>Clusters</NavLink>
                                </li>
                                <li role="presentation"><NavLink
                                    to={"/environments/" + environment + "/selftests"}>Selftests</NavLink>
                                </li>
                            </ul>
                            {this.props.children && React.cloneElement(this.props.children, {
                                environment: this.state.environment
                            })}
                        </div>


                        <div className="col-md-3">
                            <div className=" panel panel-default">
                                <div className=" panel-heading">
                                    Todo:
                                </div>
                                <div className=" panel-body">
                                    <ul>
                                        <ul>
                                            <li>Overview</li>
                                            <li>Cluster</li>
                                            <li>App</li>
                                            <li>Nodes</li>
                                        </ul>

                                        <li>liste over de applikasjonsinstansene som fins i miljøet</li>
                                        <li>ressursbruk</li>
                                        <li>avhengighetsgraf</li>
                                        <li>feil/advarsler for miljøet</li>
                                        <li>statistikker (antall applikasjoner, servere, lenke til rapporter?)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Environment.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        environments: state.environments.data,
        activeIndex: state.environments.active,
    }
}

export default connect(mapStateToProps)(Environment)