import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'


class SubmitForm extends Component {
    constructor(props) {
        super(props)
        this.state = {comment: ""}
    }

    handleChange(e) {
        this.setState({comment: e})
    }

    handleSubmitForm() {
        const {component, additionalValues, newValues, originalValues, onSubmit} = this.props
        let form = {}
        let key = ""
        switch (component) {
            case "node":
                form = {
                    password: {value: newValues.password},
                    type: newValues.type,
                    environment: additionalValues.environment,
                    environmentclass: additionalValues.environmentclass,
                    username: newValues.username,
                    hostname: newValues.hostname
                }
                key = originalValues.hostname
                break
            case "application":
                form = {
                    name: newValues.name,
                    groupid: newValues.groupid,
                    artifactid: newValues.artifactid,
                    portoffset: newValues.portoffset
                }
                key = originalValues.name
                break
            case "environment":
                form = {
                    name: newValues.name,
                    environmentclass: newValues.environmentclass
                }
                key = originalValues.name
                break
            case "cluster":
                const applications = newValues.applications.map(a => {
                    return {name: a}
                })
                const nodes = newValues.nodes.map(n => {
                    return {name: n}
                })
                form = {
                    clustername: newValues.clustername,
                    zone: newValues.zone,
                    loadbalancerurl: newValues.loadbalancerurl,
                    environmentclass: newValues.environmentclass,
                    environment: newValues.environment,
                    applications: applications,
                    nodes: nodes,
                }
                key = originalValues.clustername
                break

            default:
                console.error("handleSubmitForm in SubmitForm is missing this component type")
                return
        }
        onSubmit(key, form, this.state.comment, component)
    }

    renderDiffTable(originalValues, newValues) {

        return (
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
                    {
                        Object.keys(originalValues).map((key, idx) => {
                            if (typeof originalValues[key] === "object") {
                                if (originalValues[key].toString() === newValues[key].toString()) {
                                    return <tr key={idx}>
                                        <td><b>{key}</b></td>
                                        <td>
                                            <pre>{originalValues[key].join(`, \n`)}</pre>
                                        </td>
                                        <td>
                                            <pre>{newValues[key].join(`, \n`)}</pre>
                                        </td>
                                    </tr>
                                }
                                return <tr key={idx}>
                                    <td><b>{key}</b></td>
                                    <td>
                                        <pre>{originalValues[key].join(`, \n`)}</pre>
                                    </td>
                                    <td className="cell-bg">
                                        <pre>{newValues[key].join(`, \n`)}</pre>
                                    </td>
                                </tr>
                            } else if (originalValues[key] === newValues[key]) {
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
                        })
                    }

                    </tbody>
                </table>
            </Modal.Body>)

    }

    render() {
        const {onClose, display, originalValues, newValues} = this.props
        const diff = Object.keys(originalValues).filter((key) => {
            if (typeof originalValues[key] === "object") {
                return (originalValues[key].toString() !== newValues[key].toString())
            }
            return (originalValues[key] != newValues[key])
        })

        return (
            <Modal show={display} onHide={onClose} dialogClassName="submitForm">
                <Modal.Header>
                    <Modal.Title>Commit changes
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={onClose}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                {this.renderDiffTable(originalValues, newValues)}
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
                                    onClick={diff.length > 0 ? this.handleSubmitForm.bind(this) : () => {
                                        }}>Submit
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

export default connect(mapStateToProps)(SubmitForm)
