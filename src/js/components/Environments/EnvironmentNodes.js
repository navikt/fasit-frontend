import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {
    fetchEnvironmentNodes
} from "../../actionCreators/environment"

class EnvironmentNodes extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        const {dispatch, environment} = this.props
        dispatch(fetchEnvironmentNodes(environment))
    }
    
    componentWillReceiveProps(nextProps) {
        const {dispatch, environment} = this.props
        if (environment != nextProps.environment) {
            dispatch(fetchEnvironmentNodes(nextProps.environment))
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
                    {this.props.nodes.map(node => {
                        return <tr key={node.hostname}>
                            <td><Link
                                to={`/nodes/${node.hostname}`}>{node.hostname}</Link>
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
        nodes: state.environment_nodes_fasit.data,
        isFetching: state.environment_nodes_fasit.isFetching
    }
}

export default connect(mapStateToProps)(EnvironmentNodes)