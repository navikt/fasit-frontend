import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {showSubmitEditNodeForm} from '../../actionCreators/node_formActions'
import {submitEditNodeForm} from '../../actionCreators/node_editNodeForm'


class NodeFasitViewSubmitForm extends Component {
    constructor(props) {
        super(props)
    }

    closeSubmitForm() {
        const {dispatch} = this.props
        dispatch(showSubmitEditNodeForm(false))
    }

    handleSubmitForm() {
        const {form, fasitData, dispatch} = this.props
        const value = {
            password: {value: form.password},
            type: form.type,
            environment: fasitData.environment,
            environmentclass: fasitData.environmentclass,
            username: form.username,
            hostname: form.hostname
        }
        dispatch(submitEditNodeForm(fasitData.hostname, value))
    }

    showSubmitButton(fields) {
        if (this.findDifferences(fields).length > 0) {
            return (
                <button type="submit" className="btn btn-primary pull-right"
                        onClick={this.handleSubmitForm.bind(this, true)}>Submit
                </button>
            )
        }
        return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>
    }

    showDiffMessage(fields) {
        if (this.findDifferences(fields).length > 0)
            return false
        return <span className="form-inline pull-left submit-warning">No change detected</span>

    }

    findDifferences(fields) {
        return fields.filter((field) => {
            if (field.oldField != field.newField) {
                return field
            }
        })
    }

    generateTableRows(fields) {
        return fields.map((field, index) => {
            return this.generateTableRow(field.field, field.oldField, field.newField, index)
        })
    }

    generateTableRow(field, oldProp, newProp, id) {
        if (oldProp != newProp) {
            return (
                <tr key={id}>
                    <td><b>{field}</b></td>
                    <td>{oldProp}</td>
                    <td className="cell-bg">{newProp}</td>
                </tr>
            )
        }
        return (
            <tr key={id}>
                <td><b>{field}</b></td>
                <td>{oldProp}</td>
                <td>{newProp}</td>
            </tr>
        )
    }

    render() {
        const {fasitData, form, onClose, onSubmit, display, originalValues, newValues} = this.props
        const fields =
            [
                {
                    field: "Hostname",
                    oldField: originalValues.hostname,
                    newField: newValues.hostname
                },
                {
                    field: "Type",
                    oldField: fasitData.type,
                    newField: form.type
                },
                {
                    field: "Username",
                    oldField: fasitData.username,
                    newField: form.username
                },
                {
                    field: "Password",
                    oldField: form.currentPassword,
                    newField: form.password
                }
            ]

        return (
            <Modal show={display} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Commit changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Current value</th>
                            <th>New value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {display ?
                            Object.keys(originalValues).map((key, idx) => {
                                if (originalValues[key] === newValues[key]){
                                    return (
                                        <tr key={idx}>
                                            <td><b>{key}</b></td>
                                            <td>{originalValues[key]}</td>
                                            <td>{newValues[key]}</td>
                                        </tr>
                                    )}
                                return (
                                    <tr key={idx}>
                                        <td><b>{key}</b></td>
                                        <td>{originalValues[key]}</td>
                                        <td className="cell-bg">{newValues[key]}</td>
                                    </tr>
                                )
                            }) :
                            <td />
                        }

                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-block">
                        <div className="col-lg-10 col-lg-offset-2">
                            {this.showDiffMessage(fields)}
                            {this.showSubmitButton(fields)}
                            <button type="reset" className="btn btn-default btn-space pull-right"
                                    onClick={onClose}>Close
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

        )
    }
}
NodeFasitViewSubmitForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        fasitData: state.node_fasit.data,
        form: state.node_editNodeForm,
        editMode: state.nodes.showEditNodeForm,
        showSubmitForm: state.nodes.showSubmitEditFasitNodeForm,
        currentPassword: state.nodes.currentNodeSecret,
        display: ownProps.display,
        onSubmit: ownProps.onSubmit,
        onClose: ownProps.onClose,
        newValues: ownProps.newValues,
        oldValues: ownProps.oldValues

    }
}

export default connect(mapStateToProps)(NodeFasitViewSubmitForm)
