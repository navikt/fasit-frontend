import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import { showSubmitEditNodeForm } from '../../actionCreators/node_formActions'
import { submitEditNodeForm } from '../../actionCreators/node_editNodeForm'


class NodeFasitViewSubmitForm extends Component {
    constructor(props) {
        super(props)
    }

    closeSubmitForm() {
        const { dispatch } = this.props
        dispatch(showSubmitEditNodeForm(false))
    }

    handleSubmitForm() {
        const { form, fasitData, dispatch } = this.props
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
    showDiffMessage(fields){
        if (this.findDifferences(fields).length > 0)
            return false
        return <span className="form-inline pull-left submit-warning">No change detected</span>

    }
    findDifferences(fields){
        return fields.filter((field) => {
            if (field.oldField != field.newField){
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
        const { fasitData, form } = this.props

        const fields =
            [
                {
                    field: "Hostname",
                    oldField: fasitData.hostname,
                    newField: form.hostname
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
            <Modal show={this.props.showSubmitForm} onHide={this.closeSubmitForm.bind(this)}>
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
                        {this.generateTableRows(fields)}

                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-block">
                        <div className="col-lg-10 col-lg-offset-2">
                            {this.showDiffMessage(fields)}
                            {this.showSubmitButton(fields)}
                            <button type="reset" className="btn btn-default btn-space pull-right"
                                    onClick={this.closeSubmitForm.bind(this)}>Close
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        fasitData: state.node_fasit.data,
        form: state.node_editNodeForm,
        editMode: state.nodeData.showEditNodeForm,
        showSubmitForm: state.nodeData.showSubmitEditFasitNodeForm,
        currentPassword: state.nodeData.currentNodeSecret

    }
}

export default connect(mapStateToProps)(NodeFasitViewSubmitForm)
