import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"


class EnvironmentCluster extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {clusterName} = this.props
        return <div>I'm cluster {clusterName}</div>
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(EnvironmentCluster)