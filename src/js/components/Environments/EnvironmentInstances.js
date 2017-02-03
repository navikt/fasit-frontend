import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {
    fetchEnvironmentInstances
} from "../../actionCreators/environment"

class EnvironmentInstances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, environment} = this.props
        dispatch(fetchEnvironmentInstances(environment))
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
                    {this.props.instances.map(instance => {
                        return <tr key={instance.id}>
                            <td><Link
                                to={`"/instances/${instance.id}"`}>{instance.application + ":" + instance.version}</Link>
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
        instances: state.environment_instances_fasit.data,
        environmentName: ownProps.environment
    }
}

export default connect(mapStateToProps)(EnvironmentInstances)