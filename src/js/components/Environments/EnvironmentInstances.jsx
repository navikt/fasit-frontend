import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchEnvironmentInstances } from "../../actionCreators/environment"
import { Spinner } from "../common";

function EnvironmentInstances({ dispatch, environment, isFetching, instances }) {
  useEffect(() => {
    dispatch(fetchEnvironmentInstances(environment))
  }, [environment])

  return isFetching ? (
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
          {instances.map(instance => {
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

const mapStateToProps = state => {
  return {
    instances: state.environment_instances_fasit.data,
    isFetching: state.environment_instances_fasit.isFetching
  }
}

export default connect(mapStateToProps)(EnvironmentInstances)
