import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchEnvironmentCluster} from "../../actionCreators/environment"


class EnvironmentCluster extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const {dispatch, environment, clusterName} = this.props
        console.log(environment, clusterName)
        if (environment && clusterName)
            dispatch(fetchEnvironmentCluster(environment, clusterName))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, environment, clusterName} = this.props
        if ((environment != nextProps.environment || clusterName != nextProps.clusterName) && nextProps.environment && nextProps.clusterName) {
            dispatch(fetchEnvironmentCluster(nextProps.environment, nextProps.clusterName))
        }
    }

    render() {
        const {clusterName} = this.props
        return <div>I'm cluster {clusterName}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        cluster_data: state.environment_cluster_fasit
    }
}

export default connect(mapStateToProps)(EnvironmentCluster)