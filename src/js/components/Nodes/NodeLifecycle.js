import React from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"

function NodeLifecycle({ lifecycle }) {
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

const mapStateToProps = (state, ownProps) => {
  return {
    lifecycle: ownProps.lifecycle,
  }
}

export default connect(mapStateToProps)(NodeLifecycle)
