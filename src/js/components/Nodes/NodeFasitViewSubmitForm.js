import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'


class NodeFasitViewSubmitForm extends Component {
    constructor(props) {
        super(props)
        this.state = {comment: ""}
    }

    handleChange(e) {
        this.setState({comment: e})
    }

    handleSubmitForm() {
        const {additionalValues, newValues, onSubmit} = this.props
        const value = {
            password: {value: newValues.password},
            type: newValues.type,
            environment: additionalValues.environment,
            environmentclass: additionalValues.environmentclass,
            username: newValues.username,
            hostname: newValues.hostname
        }
        onSubmit({comment: this.state.comment, value})
    }

    render() {
        const {onClose, display, originalValues, newValues} = this.props
        const diff = Object.keys(originalValues).filter((key) => {
            return (originalValues[key] != newValues[key])
        })
        return (
            <Modal show={display} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Commit changes
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={onClose}><strong>X</strong>
                        </button>
                    </Modal.Title>
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
                                if (originalValues[key] === newValues[key]) {
                                    return (
                                        <tr key={idx}>
                                            <td><b>{key}</b></td>
                                            <td>{originalValues[key]}</td>
                                            <td>{newValues[key]}</td>
                                        </tr>
                                    )
                                }
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
                    <div className="col-xs-2 FormLabel"><b>Comment</b></div>
                    <div className="col-xs-8">
                        <textarea
                            type="text"
                            className="FormInputField FormString-value"
                            style={{"height": 85 + "px"}}
                            value={this.state.comment}
                            onChange={(e) => this.handleChange(e.target.value)}
                        />
                    </div>
                    <div className="col-xs-2 submit-button-placement">
                        <div className="btn-block">
                            <button type="submit"
                                    className={diff.length > 0 ? "btn btn-primary btn-sm pull-right" : "btn btn-primary btn-sm pull-right disabled"}
                                    onClick={diff.length > 0 ? this.handleSubmitForm.bind(this) : () => {}}>Submit
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        display: ownProps.display,
        onSubmit: ownProps.onSubmit,
        onClose: ownProps.onClose,
        newValues: ownProps.newValues,
        oldValues: ownProps.oldValues,
        additionalValues: ownProps.additionalValues

    }
}

export default connect(mapStateToProps)(NodeFasitViewSubmitForm)
