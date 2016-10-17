import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import NavLink from '../Navigation/NavLink'
import {Link} from 'react-router'


class Application extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {applications, activeApplication} = this.props
        const application = this.props.params ? this.props.params.application : applications[activeApplication].name
        return (
            <div>
                <h1><Link
                    to={"/applications/" + application}>{application}</Link>
                </h1>
                <div className="col-md-9">
                    <ul className="nav nav-tabs">
                        <li role="presentation"><NavLink
                            to={"/applications/" + application} onlyActiveOnIndex>Overview</NavLink></li>
                        <li role="presentation"><NavLink
                            to={"/applications/" + application + "/instances"}>Instances</NavLink>
                        </li>
                        <li role="presentation"><NavLink
                            to={"/applications/" + application + "/clusters"}>Clusters</NavLink>
                        </li>
                    </ul>
                    {this.props.children}
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
                                    <li>Instances</li>
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
        )
    }
}
Application.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        applications: state.applications.data,
        activeApplication: state.applications.active,
    }
}

export default connect(mapStateToProps)(Application)