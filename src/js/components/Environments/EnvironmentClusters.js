import React, {Component} from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {fetchEnvironmentClusters, clearEnvironmentClusters} from "../../actionCreators/environment"
import Select from 'react-select'
import { Spinner } from "../common";

class EnvironmentClusters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cluster: "",
            application: "",
            node:""
        }
    }

    componentDidMount() {
        const {dispatch, environment} = this.props
        if (environment)
            dispatch(fetchEnvironmentClusters(environment))
    }

    componentDidUpdate(prevProps) {
        const {dispatch, environment} = this.props
        if (prevProps.environment != environment && environment) {
            dispatch(fetchEnvironmentClusters(environment))
        }
    }
    compnentWillUnmount(){
        const {dispatch} = this.props
        dispatch(clearEnvironmentClusters())
    }

    render() {
        const {cluster, application, node} = this.state
        const {clusters, isFetching} = this.props

        const clustersFilteredByName = clusters.filter(c => (!cluster || c.clustername === cluster) ? true : false)
        const clustersFilteredByNameAndApplication = clustersFilteredByName.filter(c => (!application|| c.applications.filter(app => app.name === application).length > 0 ? true : false))
        const clustersFilteredByNameApplicationAndNode = clustersFilteredByNameAndApplication.filter(c => (!node|| c.nodes.filter(n => n.name === node).length > 0 ? true : false))

        const clusterNames = clusters.map(c => c.clustername)
        const applicationNames = clusters.reduce((a, b) => a.concat(b.applications), []).map(a => a.name)
        const nodeNames = clusters.reduce((a, b) => a.concat(b.nodes), []).map(a => a.name)

        return isFetching ? <Spinner/> : (
                <div>
                    <div style={{width: 350, display: "inline-block"}}>
                        <Select
                            isClearable
                            placeholder="Cluster"
                            value={cluster ? {value: cluster, label: cluster} : null}
                            options={this.convertToSelectObject(clusterNames)}
                            onChange={(e) => this.handleChange("cluster", e ? e.value : "")}
                        />
                    </div>
                    <div style={{width: 250, display: "inline-block", paddingLeft: 20}}>
                        <Select
                            isClearable
                            placeholder="Application"
                            value={application ? {value: application, label: application} : null}
                            options={this.convertToSelectObject(applicationNames)}
                            onChange={(e) => this.handleChange("application", e ? e.value : "")}
                        />
                    </div>
                    <div style={{width: 250, display: "inline-block", paddingLeft: 20}}>
                        <Select
                            isClearable
                            placeholder="Node"
                            value={node ? {value: node, label: node} : null}
                            options={this.convertToSelectObject(nodeNames)}
                            onChange={(e) => this.handleChange("node", e ? e.value : "")}
                        />
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clustersFilteredByNameApplicationAndNode.map(cluster => {
                            return <tr key={cluster.id}>
                                <td>
                                    <Link
                                        to={`/environments/${this.props.environment}/clusters/${cluster.clustername}`}>{cluster.clustername}</Link>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            )
    }


    convertToSelectObject(values) {
        return values.map(value => {
            return {value, label: value}
        })
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }
}

const mapStateToProps = (state) => {
    return {
        clusters: state.environment_clusters.data,
        isFetching: state.environment_clusters.isFetching
    }
}

export default connect(mapStateToProps)(EnvironmentClusters)