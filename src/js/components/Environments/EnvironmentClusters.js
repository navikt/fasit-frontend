import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {
    fetchEnvironmentClusters
} from "../../actionCreators/environment"

class EnvironmentClusters extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, environment} = this.props
        dispatch(fetchEnvironmentClusters(environment))
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.clusters.map(cluster => {
                        return <tr key={cluster.id}>
                            <td><Link
                                to={`/environments/${this.props.environmentName}/clusters/${cluster.clustername}`}>{cluster.clustername}</Link>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        clusters: state.environment_clusters_fasit.data,
        environmentName: ownProps.environment
    }
}

export default connect(mapStateToProps)(EnvironmentClusters)