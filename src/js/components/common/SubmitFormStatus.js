import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Toast from "react-bootstrap/Toast"
import { resetFormStatus } from "../../actionCreators/common"

class SubmitFormStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form, dispatch } = this.props
    return (
      <Toast
        onClose={() => dispatch(resetFormStatus())}
        show={form.displaySnackbar}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#72bd72",
          borderColor: "#3c763d",
          color: "#333",
        }}
        delay={2000}
        autohide
      >
        <Toast.Body>Success</Toast.Body>
      </Toast>
    )
  }
}
SubmitFormStatus.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    form: state.submit_form,
  }
}

export default connect(mapStateToProps)(SubmitFormStatus)
