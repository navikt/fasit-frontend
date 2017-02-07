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

    componentDidMount(){
        console.log("envcluster, component did mount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("envcluster, received props", nextProps);
        const {dispatch, environment} = this.props
        if (environment != nextProps.environment) {
            dispatch(fetchEnvironmentClusters(nextProps.environment))
        }
    }

    render() {
        return (this.props.isFetching) ? <i className="fa fa-spinner fa-pulse fa-2x"></i> : (
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
                            <td>
                                <Link to={`/environments/${this.props.environment}/clusters/${cluster.clustername}`}>{cluster.clustername}</Link>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clusters: state.environment_clusters_fasit.data,
        isFetching: state.environment_clusters_fasit.isFetching
    }
}

export default connect(mapStateToProps)(EnvironmentClusters)