import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'
import { Modal } from "../common/Modal"
import {connect} from "react-redux";
import {FormComment, FormDropDown, FormString} from "../common/Forms";
import {capitalize} from "../../utils";
import {displayModal, submitForm} from "../../actionCreators/common";

function NewEnvironmentForm({ dispatch, environmentClasses, showNewEnvironmentForm, mode, name, environmentclass: environmentclassProp }) {
    const [localName, setLocalName] = useState("")
    const [localEnvironmentclass, setLocalEnvironmentclass] = useState("")
    const [comment, setComment] = useState("")

    const prevModeRef = useRef(mode)
    const prevNameRef = useRef(name)
    const prevEnvironmentclassRef = useRef(environmentclassProp)

    useEffect(() => {
        if (mode !== prevModeRef.current || name !== prevNameRef.current || environmentclassProp !== prevEnvironmentclassRef.current) {
            if (mode === "edit" || mode === "copy") {
                setLocalName(name)
                setLocalEnvironmentclass(environmentclassProp)
            } else {
                resetLocalState()
            }
        }
        prevModeRef.current = mode
        prevNameRef.current = name
        prevEnvironmentclassRef.current = environmentclassProp
    })

    const resetLocalState = () => {
        setLocalName("")
        setLocalEnvironmentclass("")
        setComment("")
    }

    const handleChange = (field, value) => {
        switch (field) {
            case "name": setLocalName(value); break
            case "environmentclass": setLocalEnvironmentclass(value); break
            case "comment": setComment(value); break
        }
    }

    const handleSubmitForm = () => {
        const form = {
            name: localName,
            environmentclass: localEnvironmentclass,
        }

        if(mode === "edit") {
            dispatch(submitForm(name, form, comment, "environment"))
        }
        else {
            dispatch(submitForm(form.name, form, comment, "newEnvironment"))
        }
    }

    const closeForm = () => {
        resetLocalState()
        dispatch(displayModal("environment", false))
    }

    const showSubmitButton = () => {
        if (localName && localEnvironmentclass) {
            return (
                <button type="submit"
                        className="btn btn-primary float-end"
                        onClick={handleSubmitForm}>Submit
                </button>
            )
        }
        return <button type="submit" className="btn btn-primary float-end disabled">Submit</button>
    }

    return (
        <Modal show={showNewEnvironmentForm} enforceFocus={false} onHide={closeForm}>
            <Modal.Header>
                <Modal.Title>{mode && `${capitalize(mode)} environment ${mode !== 'new' ? name : ''}` }
                    <button type="reset" className="btn btn-link float-end"
                            onClick={closeForm}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormString
                    label="name"
                    editMode={true}
                    value={localName}
                    handleChange={handleChange}
                />
                <FormDropDown
                    label="environmentclass"
                    editMode={true}
                    value={localEnvironmentclass}
                    handleChange={handleChange}
                    options={environmentClasses}
                />
                <div className="col-12" style={{height: 15}}></div>
            </Modal.Body>
            <Modal.Footer>
                <FormComment
                    value={comment}
                    handleChange={handleChange}
                />
                <br />
                <div className="row">
                    <div className="row col-lg-10 offset-lg-2">
                        {showSubmitButton()}
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

NewEnvironmentForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewEnvironmentForm: state.environments.showNewEnvironmentForm,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        zones: state.environments.zones,
        mode: state.environments.mode,
        name: state.environment_fasit.data.name,
        environmentclass: state.environment_fasit.data.environmentclass,
    }
}

export default connect(mapStateToProps)(NewEnvironmentForm)
