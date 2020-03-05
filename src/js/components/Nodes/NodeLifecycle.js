import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"

class NodeLifecycle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lifecycle } = this.props
    switch (lifecycle.status) {
      case "stopped":
        return <div className="alert alert-danger col-md-8">This element was stopped.</div>
      case "alerted":
        return (
          <div className="alert alert-danger col-md-8">
            This element is a candidate for deletion.
          </div>
        )
      default:
        return <div />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lifecycle: ownProps.lifecycle,
  }
}

export default connect(mapStateToProps)(NodeLifecycle)
