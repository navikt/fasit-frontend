import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { fetchEnvironmentInstances } from "../../actionCreators/environment"
import { Spinner } from "../common";

class EnvironmentInstances extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, environment } = this.props
    dispatch(fetchEnvironmentInstances(environment))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, environment } = this.props
    if (environment != nextProps.environment) {
      dispatch(fetchEnvironmentInstances(nextProps.environment))
    }
  }

  render() {
    return this.props.isFetching ? (
      <Spinner />
    ) : (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.instances.map(instance => {
              return (
                <tr key={instance.id}>
                  <td>
                    <Link to={`/instances/${instance.id}`}>
                      {instance.application + ":" + instance.version}
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    instances: state.environment_instances_fasit.data,
    isFetching: state.environment_instances_fasit.isFetching
  }
}

export default connect(mapStateToProps)(EnvironmentInstances)
