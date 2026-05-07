import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import { Spinner } from "../common"

function EnvironmentNodes({ dispatch, environment, isFetching, nodes }) {
  useEffect(() => {
    dispatch(fetchEnvironmentNodes(environment))
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
          {nodes.map(node => {
            return (
              <tr key={node.hostname}>
                <td>
                  <Link to={`/nodes/${node.hostname}`}>{node.hostname}</Link>
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
    nodes: state.environment_nodes_fasit.data,
    isFetching: state.environment_nodes_fasit.isFetching
  }
}

export default connect(mapStateToProps)(EnvironmentNodes)
