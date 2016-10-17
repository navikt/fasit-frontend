import React, {Component, PropTypes} from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { showEditNodeForm } from '../../actionCreators/nodeFormActions'
import { closeSubmitEditNodeFormStatus } from '../../actionCreators/node_editNodeForm'


class NodeFasitViewSubmitFormStatus extends Component {
    constructor(props) {
        super(props)
    }

    closeSubmitForm() {
        const {dispatch} = this.props
        dispatch(closeSubmitEditNodeFormStatus())
        dispatch(showEditNodeForm(false))
    }

    render() {
        const {form} = this.props
        if (form.isSubmitting) {
            return (
                <Modal show={form.isSubmitting}>
                    <Modal.Header>
                        <Modal.Title>Submitting changes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <i className="fa fa-spinner fa-pulse fa-2x"></i>
                    </Modal.Body>
                </Modal>
            )

        } else if (form.submitSuccess) {
            return (
                <Modal bsSize="small" show={form.submitSuccess} onHide={this.closeSubmitForm.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center"><i className="fa fa-check fa-3x event-ok"/></div>
                    </Modal.Body>

                </Modal>
            )

        } else if (form.submitError) {
            return (
                <Modal bsSize="small" show={form.submitError.length > 0} onHide={this.closeSubmitForm.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>Submitting changes failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center"><i className="fa fa-times fa-3x event-error"/></div>

                        <pre>{form.submitError}</pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="close" className="btn btn-default btn-space pull-right"
                                onClick={this.closeSubmitForm.bind(this)}>Close
                        </button>
                    </Modal.Footer>
                </Modal>
            )
        }
        return <div></div>
    }
}
NodeFasitViewSubmitFormStatus.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        form: state.node_editNodeForm,
    }
}

export default connect(mapStateToProps)(NodeFasitViewSubmitFormStatus)
