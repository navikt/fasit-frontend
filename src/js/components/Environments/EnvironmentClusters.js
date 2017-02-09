import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {fetchEnvironmentClusters} from "../../actionCreators/environment"
import Select from 'react-select'

class EnvironmentClusters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cluster: "",
            application: ""
        }
    }

    componentDidMount() {
        const {dispatch, environment} = this.props
        if (environment)
            dispatch(fetchEnvironmentClusters(environment))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, environment} = this.props
        if (environment != nextProps.environment && nextProps.environment) {
            dispatch(fetchEnvironmentClusters(nextProps.environment))
        }
    }

    render() {
        const {cluster, application} = this.state
        const {clusters, isFetching} = this.props
        const clustersFilteredByName = clusters.filter(c => (!cluster || c.clustername === cluster) ? true : false)
        const clustersFilteredByNameAndApplication = clustersFilteredByName.filter(c => (!application|| c.applications.filter(app => app.name === application).length > 0 ? true : false))
        const clusterNames = clusters.map(c => c.clustername)
        const applicationNames = clusters.reduce((a, b) => a.concat(b.applications), []).map(a => a.name)
        return isFetching ? <i className="fa fa-spinner fa-pulse fa-2x"> </i> : (
                <div>
                    <div style={{width: 350, display: "inline-block"}}>
                        <Select
                            resetValue=""
                            placeholder="Cluster"
                            name="form-field-name"
                            value={cluster}
                            options={this.convertToSelectObject(clusterNames)}
                            onChange={(e) => this.handleChange("cluster", e.value)}
                        />
                    </div>
                    <div style={{width: 250, display: "inline-block", paddingLeft: 20}}>
                        <Select
                            resetValue=""
                            placeholder="Application"
                            name="form-field-name"
                            value={application}
                            options={this.convertToSelectObject(applicationNames)}
                            onChange={(e) => this.handleChange("application", e.value)}
                        />
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clustersFilteredByNameAndApplication.map(cluster => {
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
        clusters: state.environment_clusters_fasit.data,
        isFetching: state.environment_clusters_fasit.isFetching
    }
}

export default connect(mapStateToProps)(EnvironmentClusters)