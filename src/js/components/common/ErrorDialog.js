import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
//import Dialog from 'material-ui/Dialog'
//import FlatButton from 'material-ui/FlatButton'
//import {icons} from '../../commonStyles/commonInlineStyles'
import { clearFormError } from "../../actionCreators/common"
//import {styles} from '../../commonStyles/commonInlineStyles'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

class ErrorDialog extends Component {
  constructor(props) {
    super(props)
  }

  handleClose() {
    const { dispatch } = this.props
    dispatch(clearFormError())
  }

  render() {
    const { errorMessage, formError } = this.props
    return (
      <Modal
        show={formError}
        onHide={() => this.handleClose()}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error from API</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.handleClose()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ErrorDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.submit_form.submitFormErrorMessage,
    formError: state.submit_form.formError,
  }
}

export default connect(mapStateToProps)(ErrorDialog)
