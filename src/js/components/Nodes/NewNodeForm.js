import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal"
import { connect } from "react-redux";
import { FormString, FormDropDown, FormComment } from "../common/Forms";
import { displayModal, submitForm } from "../../actionCreators/common";

function NewNodeForm({ dispatch, showNewNodeForm, nodeTypes, environmentClasses, environments, zones, node, mode }) {
    const [hostname, setHostname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [environment, setEnvironment] = useState("")
    const [environmentclass, setEnvironmentclass] = useState("")
    const [zone, setZone] = useState("")
    const [comment, setComment] = useState("")

    const resetState = () => {
        setHostname("")
        setUsername("")
        setPassword("")
        setType("")
        setEnvironment("")
        setEnvironmentclass("")
        setZone("")
        setComment("")
    }

    useEffect(() => {
        if (mode === "edit" || mode === "copy") {
            const data = node.data
            setHostname(data.hostname)
            setUsername(data.username)
            setType(data.type)
            setEnvironment(data.environment)
            setEnvironmentclass(data.environmentclass)
            setZone(data.zone)
            setPassword(node.currentPassword)
        } else {
            resetState()
        }
    }, [mode, node]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (field, value) => {
        switch (field) {
            case "hostname": setHostname(value); break
            case "username": setUsername(value); break
            case "password": setPassword(value); break
            case "type": setType(value); break
            case "environment": setEnvironment(value); break
            case "environmentclass": setEnvironmentclass(value); break
            case "zone": setZone(value); break
            case "comment": setComment(value); break
        }
    }

    const handleSubmitForm = () => {
        const form = {
            hostname,
            username,
            password: {value: password},
            type,
            environment,
            environmentclass,
        }
        if (!(environmentclass === 'u')) {
            form["zone"] = zone
        }

        if (mode === "edit") {
            dispatch(submitForm(form.hostname, form, comment, "node"))
        } else {
            dispatch(submitForm(form.hostname, form, comment, "newNode"))
        }
    }

    const closeForm = () => {
        resetState()
        dispatch(displayModal("node", false))
    }

    const showSubmitButton = () => {
        if (hostname && username && password && type && environmentclass && environment) {
            if ((zone) || (environmentclass === 'u')) {
                return (
                    <button type="submit"
                            className="btn btn-primary float-end"
                            onClick={handleSubmitForm}>Submit
                    </button>
                )
            }
        }
        return <button type="submit" className="btn btn-primary float-end disabled">Submit</button>
    }

    const environmentSelector = () => {
        if (environmentclass) {
            const filteredEnvironments = environments.filter((env) => {
                if (!environmentclass) {
                    return true
                } else {
                    return env.environmentclass === environmentclass
                }
            })

            return (
                <FormDropDown
                    label="environment"
                    editMode={mode !== "edit"}
                    value={environment}
                    handleChange={handleChange}
                    options={filteredEnvironments.map((env) => env.name)}
                />)
        }
    }

    const zoneSelector = () => {
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormDropDown
                    label="zone"
                    editMode={mode !== "edit"}
                    value={zone}
                    handleChange={handleChange}
                    options={zones}
                />)
        }
    }

    return (
        <Modal show={showNewNodeForm} enforceFocus={false} onHide={closeForm}>
            <Modal.Header>
                <Modal.Title>New node
                    <button type="reset" className="btn btn-link float-end"
                            onClick={closeForm}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormString
                    label="hostname"
                    editMode={mode !== "edit"}
                    value={hostname}
                    handleChange={handleChange}
                />
                <FormString
                    label="username"
                    editMode={true}
                    value={username}
                    handleChange={handleChange}
                />
                <FormString
                    label="password"
                    editMode={true}
                    value={password}
                    handleChange={handleChange}
                />
                <FormDropDown
                    label="type"
                    editMode={true}
                    value={type}
                    handleChange={handleChange}
                    options={nodeTypes}
                />
                <FormDropDown
                    label="environmentclass"
                    editMode={mode !== "edit"}
                    value={environmentclass}
                    handleChange={handleChange}
                    options={environmentClasses}
                />
                {environmentSelector()}
                {zoneSelector()}
                <div className="col-12" style={{height: 15 + 'px'}}></div>
            </Modal.Body>
            <Modal.Footer>
                <FormComment
                    value={comment}
                    handleChange={handleChange}
                />
                <br/>
                <div className="row">
                    <div className="row col-lg-10 offset-lg-2">
                        {showSubmitButton()}
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        showNewNodeForm: state.nodes.showNewNodeForm,
        nodeTypes: state.nodes.nodeTypes,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        zones: state.environments.zones,
        node: state.node_fasit,
        mode: state.nodes.mode
    }
}

export default connect(mapStateToProps)(NewNodeForm)
