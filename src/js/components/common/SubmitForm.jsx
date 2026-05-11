import React, {useState} from 'react'
import { Modal } from "./Modal"
import {connect} from 'react-redux'

function SubmitForm({ component, additionalValues, newValues, originalValues, onSubmit, onClose, display }) {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e)
    }

    const handleSubmitForm = () => {
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
            case "cluster": {
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
            }
            default:
                console.error("handleSubmitForm in SubmitForm is missing this component type")
                return
        }
        onSubmit(key, form, comment, component)
    }

    const renderDiffTable = (origValues, newVals) => {

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
                        Object.keys(origValues).map((key, idx) => {
                            if (typeof origValues[key] === "object") {
                                if (origValues[key].toString() === newVals[key].toString()) {
                                    return <tr key={idx}>
                                        <td><b>{key}</b></td>
                                        <td>
                                            <pre>{origValues[key].join(`, \n`)}</pre>
                                        </td>
                                        <td>
                                            <pre>{newVals[key].join(`, \n`)}</pre>
                                        </td>
                                    </tr>
                                }
                                return <tr key={idx}>
                                    <td><b>{key}</b></td>
                                    <td>
                                        <pre>{origValues[key].join(`, \n`)}</pre>
                                    </td>
                                    <td className="cell-bg">
                                        <pre>{newVals[key].join(`, \n`)}</pre>
                                    </td>
                                </tr>
                            } else if (origValues[key] === newVals[key]) {
                                return (
                                    <tr key={idx}>
                                        <td><b>{key}</b></td>
                                        <td>{origValues[key]}</td>
                                        <td>{newVals[key]}</td>
                                    </tr>
                                )
                            }
                            return (
                                <tr key={idx}>
                                    <td><b>{key}</b></td>
                                    <td>{origValues[key]}</td>
                                    <td className="cell-bg">{newVals[key]}</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </Modal.Body>)

    }

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
                    <button type="reset" className="btn btn-link float-end"
                            onClick={onClose}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            {renderDiffTable(originalValues, newValues)}
            <Modal.Footer>
                <div className="col-2 FormLabel"><b>Comment</b></div>
                <div className="col-8">
                    <textarea
                        type="text"
                        className="FormInputField FormString-value"
                        style={{"height": 85 + "px"}}
                        value={comment}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <div className="col-2 submit-button-placement">
                    <div className="btn-block">
                        <button type="submit"
                                className={diff.length > 0 ? "btn btn-primary btn-sm float-end" : "btn btn-primary btn-sm float-end disabled"}
                                onClick={diff.length > 0 ? handleSubmitForm : () => {
                                    }}>Submit
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

export default connect(mapStateToProps)(SubmitForm)
