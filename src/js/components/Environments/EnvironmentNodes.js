import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import { Spinner } from "../common"

class EnvironmentNodes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, environment } = this.props
    dispatch(fetchEnvironmentNodes(environment))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, environment } = this.props
    if (prevProps.environment != environment) {
      dispatch(fetchEnvironmentNodes(environment))
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
            {this.props.nodes.map(node => {
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
}

const mapStateToProps = state => {
  return {
    nodes: state.environment_nodes_fasit.data,
    isFetching: state.environment_nodes_fasit.isFetching
  }
}

export default connect(mapStateToProps)(EnvironmentNodes)
