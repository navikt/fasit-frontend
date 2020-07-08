import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Snackbar from "@material-ui/core/Snackbar"
import { resetFormStatus } from "../../actionCreators/common"

class SubmitFormStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form } = this.props
    return (
      <Snackbar
        open={form.displaySnackbar}
        message="Success"
        autoHideDuration={3000}
        onClose={() => this.props.dispatch(resetFormStatus())}
      />
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
